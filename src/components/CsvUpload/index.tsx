import React, { useState } from 'react';
import Papa from 'papaparse';
import { 
  UploadButton,
  TabContainer,
  UploadContainer,
  Tab,
  Content,
  Input,
  FileInput
} from './styles';

interface CsvUploadProps {
  onTokensParsed: (tokens: string[]) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export const CsvUpload: React.FC<CsvUploadProps> = ({ onTokensParsed, activeTab, setActiveTab }) => {
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

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const tokens = results.data.filter((row): row is string[] => Array.isArray(row)).map(row => row[0]);
          console.log('tokens', tokens);
          onTokensParsed(tokens);
        }
      });
    }
  };  

  return (
    <UploadContainer>
      <TabContainer>
        <Tab isActive={activeTab === 'singleToken'} onClick={() => setActiveTab('singleToken')}>Single Token</Tab>
        <Tab isActive={activeTab === 'bulkUpload'} onClick={() => setActiveTab('bulkUpload')}>Bulk Upload</Tab>
      </TabContainer>
      <Content>
        {activeTab === 'singleToken' && (
          <>
            <Input type="text" value={singleToken} onChange={handleSingleTokenChange} placeholder="Enter Firebase Token" />
            <UploadButton onClick={handleSingleToken}>Confirm</UploadButton>
          </>
        )}

        {activeTab === 'bulkUpload' && (
          <>
            <FileInput type="file" onChange={handleFileChange} />
            <UploadButton onClick={handleUpload}>Upload</UploadButton>
          </>
        )}
      </Content>
    </UploadContainer>
  );
};

