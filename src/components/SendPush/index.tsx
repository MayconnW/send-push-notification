/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CsvUpload } from '../CsvUpload';
import { MessageForm } from '../MessageForm';
import { useConf } from '../../hooks/use-conf';
import { Container } from './styles';
import { Progress } from '../Progress';
import { sleep } from '../../util/sleep';
import { Result } from '../Result';

type Step = 'informTokens' | 'pushDetails' | 'progress' | 'result';

export function SendPush() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [lots, setLots] = useState<string[][]>([]);
  const [successTokensSent, setSuccessTokensSent] = useState(0);
  const [failedTokensSent, setFailedTokensSent] = useState(0);
  const [failedLots, setFailedLots] = useState<{
    lotNumber: number;
    startId: string;
    endId: string;
  }[]>([]);

  const [startingLotIndex, setStartingLotIndex] = useState(0);
  const [sendingLotNumber, setSendingLotNumber] = useState(0);

  const [activeTab, setActiveTab] = useState<'singleToken' | 'bulkUpload'>('singleToken');
  const [step, setStep] = useState<Step>('informTokens');

  const { serverKey } = useConf();

  const handleClear = useCallback(() => {
    setLots([]);
    setTokens([]);
    setStartingLotIndex(0);
    setSendingLotNumber(0);
    setFailedLots([]);
    setSuccessTokensSent(0);
    setFailedTokensSent(0);
    setStep('informTokens');
  }, []);


  useEffect(() => {
    const chunkSize = 1000;
    const newLots = [];

    for (let i = 0; i < tokens.length; i += chunkSize) {
      const chunk = tokens.slice(i, i + chunkSize);
      newLots.push(chunk);
    }

    setLots(newLots);
  }, [tokens]);

  const handleSubmit = useCallback(async ({ title, body, route, branchBody, branchTitle }: { title: string; body: string; route?: string; branchTitle?: string; branchBody?: string }) => {
    
    if (!serverKey) {
      alert('Server key not setup');
      return;
    }

    setStep('progress');
    setSendingLotNumber(1);

    let failuresCount = 0;
    let successCount = 0;

    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + serverKey
    };

    for (let i = startingLotIndex; i < lots.length; i++) {
      setSendingLotNumber(i + 1);
      const payload = {
        registration_ids: lots[i],
        notification: {
          title: title,
          body: body,
        },
        data: undefined as any,
      };

      if (route || branchBody || branchTitle) {
        payload.data = {};
        if (route) {
          payload.data = {
            ...payload.data,
            inner_route: route
          }
        }
        if (branchTitle) {
          payload.data = {
            ...payload.data,
            title: branchTitle
          }
        }
        if (branchBody) {
          payload.data = {
            ...payload.data,
            body: branchBody
          }
        }
      }
  
      try {
        const response = await fetch(fcmUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        });

        const jsonResponse = await response.json();
        failuresCount += jsonResponse.failure;
        successCount += jsonResponse.success;
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        if ((i +1) < lots.length) {
          await sleep(20000);
        }
      } catch (error) {
        setFailedLots(current => {
          return [
            ...current, {
            lotNumber: i+1,
            startId: lots[i][0],
            endId: lots[i][lots[i].length - 1]
          }];
        })
        break;
      }
    }
    setSuccessTokensSent(successCount);
    setFailedTokensSent(failuresCount);
    setStep('result');
  }, [lots, serverKey, startingLotIndex]);

  const steps = useMemo(() => ({
    informTokens: (
      <CsvUpload 
        onTokensParsed={setTokens} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        handleNextStep={() => setStep('pushDetails')}
      />
    ),
    pushDetails: (
      <MessageForm 
        onSubmit={handleSubmit}
        handleBack={() => setStep('informTokens')}
        isSingleToken={activeTab === 'singleToken'}
      />
    ),
    progress: (
      <Progress 
        numberOfLots={lots.length}
        numberOfTokens={tokens.length}
        secondsToWait={20}
        sendingLotNumber={sendingLotNumber}
        startedFromLot={startingLotIndex + 1}
        isSingleToken={activeTab === 'singleToken'}
      />
    ),
    result: (
      <Result 
        failedLots={failedLots}
        handleClear={handleClear}
        numberOfFailedDeliveredTokens={failedTokensSent}
        numberOfSuccessDeliveredTokens={successTokensSent}
        numberOfTokensSent={tokens.length}
      />
    ),
  }), [activeTab, failedLots, failedTokensSent, handleClear, handleSubmit, lots.length, sendingLotNumber, startingLotIndex, successTokensSent, tokens.length]);

  return (
      <Container>
        {steps[step]}
      </Container>
    );

    //         <label>Start from lot index: </label>
    //         <input 
    //           type="number" 
    //           value={startingLotIndex} 
    //           onChange={(e) => setStartingLotIndex(Math.max(0, Math.min(lots.length - 1, parseInt(e.target.value))))} 
    //           min="0" 
    //           max={lots.length - 1}
    //         />
}
