/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Form,
  FormField,
  Label,
  Input,
  StyledSelect
} from './styles';
import {NamedRoutes, namedRoutes} from './namedRoutes';
import { Button, Flex } from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';

interface MessageFormProps {
  onSubmit: (data: { title: string; body: string; route: string; branchTitle?: string; branchBody?: string }) => void;
  handleBack: () => void;
  isSingleToken: boolean;
}

const transformDataToOptions = (data: NamedRoutes) => {
  const options = [];

  for (const [groupKey, group] of Object.entries(data)) {
    if (typeof group === 'object' && !Array.isArray(group)) {
      for (const [itemKey, itemValue] of Object.entries(group)) {
        options.push({ value: itemValue, label: `${groupKey}.${itemKey}` });
      }
    } else {
      options.push({ value: group, label: groupKey });
    }
  }

  return options;
};

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, handleBack, isSingleToken }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [branchTitle, setBranchTitle] = useState<string>('');
  const [branchBody, setBranchBody] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body, route: selectedValue, branchBody, branchTitle });
  };

  const handleSelectChange = (selectedOption: any) => {
    console.log('Selecionei: ', selectedOption);
    setSelectedValue(selectedOption.value);
  };

  const options = transformDataToOptions(namedRoutes);

  return (
    <Form onSubmit={handleSubmit}>
      {isSingleToken ? (
        <h5>Single token selected</h5>
      ) : (
        <h5>CSV file selected</h5>
      )}
      <FormField>
        <Label>Title:</Label>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Branch Title:</Label>
        <Input type="text" value={branchTitle} onChange={(e) => setBranchTitle(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Body:</Label>
        <Input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Branch Body:</Label>
        <Input type="text" value={branchBody} onChange={(e) => setBranchBody(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Route:</Label>
        <StyledSelect options={options} onChange={handleSelectChange} value={options.find(option => option.value === selectedValue)}/>
      </FormField>
      <Flex
        w="100%"
        justifyContent="space-between"
        mt="4"
      >
        <Button 
          leftIcon={<ArrowBackIcon />} 
          _focus={{outline: 'none'}} 
          onClick={handleBack}
        >
          Back
        </Button> 
        <Button
          rightIcon={<CheckIcon />}
          _focus={{outline: 'none'}} 
          type="submit"
        >
          {`Send Notification${isSingleToken ? 's' : ''}`}
        </Button>
      </Flex>
    </Form>
  );
};
