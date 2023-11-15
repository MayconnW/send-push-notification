/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { CsvUpload } from './components/CsvUpload';
import { MessageForm } from './components/MessageForm';
import { Container } from './App';

const App: React.FC = () => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [lots, setLots] = useState<string[][]>([]);

  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressMessage2, setProgressMessage2] = useState('');

  const [startingLotIndex, setStartingLotIndex] = useState(0);

  const [activeTab, setActiveTab] = useState<'singleToken' | 'bulkUpload'>('singleToken');


  useEffect(() => {
    const chunkSize = 1000;
    const newLots = [];

    for (let i = 0; i < tokens.length; i += chunkSize) {
      const chunk = tokens.slice(i, i + chunkSize);
      newLots.push(chunk);
    }

    setLots(newLots);
  }, [tokens]);

  const handleTokensParsed = (parsedTokens: string[]) => {
    setTokens(parsedTokens);
  };

  const handleSubmit = async ({ title, body, serverKey, route }: { title: string; body: string; serverKey: string; route?: string }) => {
    setLoading(true);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    const fcmUrl = 'https://fcm.googleapis.com/fcm/send';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + serverKey
    };

    for (let i = startingLotIndex; i < lots.length; i++) {
      setProgressMessage(`Sending lot ${i} of ${lots.length - 1} lots`);
      const payload = {
        registration_ids: lots[i],
        notification: {
          title: title,
          body: body,
        },
        data: undefined as any,
      };

      if (route) {
        payload.data = {
          inner_route: route
        }
      }
  
      try {
        const response = await fetch(fcmUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        console.log(`Enviado lot ${i} with ${JSON.stringify({data: {...payload.data}, notification: {...payload.notification}})}`)
  
        if (i < lots.length) {
          await sleep(20000);
        }
        
        setProgressMessage2(`Sent ${i + 1} of ${lots.length} lots`);
      } catch (error) {
        console.error(`Error sending notification from lot:${i}', error: ${error}`);
        // Optionally, handle the error more gracefully, like breaking the loop
        break;
      }
    }   
    if (activeTab === 'singleToken') {
      alert('Push enviado');
    } else {
      alert('Pushes enviados');
    }
    setLoading(false);
  };

  return (
    <Container>
      <h1>Envio de Notificações</h1>
      <h3>Tipo de envio</h3>
      <CsvUpload onTokensParsed={handleTokensParsed} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <h3>Detalhes da Mensagem</h3>
      <MessageForm onSubmit={handleSubmit} />
      <div>
        {lots.length > 0 && (
          <>
            Number of lots: {lots.length}
            <div>
            <label>Start from lot index: </label>
            <input 
              type="number" 
              value={startingLotIndex} 
              onChange={(e) => setStartingLotIndex(Math.max(0, Math.min(lots.length - 1, parseInt(e.target.value))))} 
              min="0" 
              max={lots.length - 1}
            />
            {/* ...rest of your UI */}
          </div>
          </>
        )}
      </div>
      <div>
        {loading && <p>{progressMessage}</p>}
        {!!progressMessage2 && <p>{progressMessage2}</p>}
        {/* ... rest of your component */}
      </div>
    </Container>
  );
}

export default App;
