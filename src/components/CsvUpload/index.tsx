import React, { useState } from 'react';
import Papa from 'papaparse';
import { 
  TabContainer,
  UploadContainer,
  Tab,
  Content,
  Input,
  FileInput
} from './styles';
import { Button, Flex } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface CsvUploadProps {
  onTokensParsed: (tokens: string[]) => void;
  activeTab: 'singleToken' | 'bulkUpload';
  setActiveTab: React.Dispatch<React.SetStateAction<'singleToken' | 'bulkUpload'>>
  handleNextStep: () => void;
}

export const CsvUpload: React.FC<CsvUploadProps> = ({ onTokensParsed, activeTab, setActiveTab, handleNextStep }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [singleToken, setSingleToken] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSingleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleToken(e.target.value);
  };

  const handleSingleToken = () => {
    onTokensParsed([singleToken]);
  }

  const handleUpload = async () => {
    if (file) {
      return new Promise((resolve) => {
        Papa.parse(file, {
          complete: (results) => {
            const tokens = results.data.filter((row): row is string[] => Array.isArray(row)).map(row => row[0]);
            onTokensParsed(tokens);
            resolve(true);
          }
        });
      });
    }
  };

  const handleNext = async () => {
    try {
      setLoading(true);

      if (activeTab === 'singleToken') {
        if (!singleToken) {
          alert('Token not provided');
          return;
        }
        handleSingleToken();
        handleNextStep();
        return;
      }
      if (activeTab === 'bulkUpload') {
        if (!file) {
          alert('File not selected');
          return;
        }
        await handleUpload();
        handleNextStep();
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <UploadContainer>
      <TabContainer>
        <Tab active={activeTab === 'singleToken' ? 1 : 0} onClick={() => setActiveTab('singleToken')}>Single Token</Tab>
        <Tab active={activeTab === 'bulkUpload' ? 1 : 0} onClick={() => setActiveTab('bulkUpload')}>Bulk Upload</Tab>
      </TabContainer>
      <Content>
        {activeTab === 'singleToken' && (
          <Input type="text" value={singleToken} onChange={handleSingleTokenChange} placeholder="Enter Firebase Push Token" />
        )}

        {activeTab === 'bulkUpload' && (
          <FileInput type="file" onChange={handleFileChange}/>
        )}
      </Content>
      <Flex
        w="100%"
        justifyContent="flex-end"
        mt="4"
      >
        <Button 
          rightIcon={<ArrowForwardIcon />} 
          _focus={{outline: 'none'}} 
          onClick={handleNext}
          isLoading={loading}
          isActive={!loading}
        >
          Next
        </Button> 
      </Flex>
    </UploadContainer>
  );
};
