import React, { useState } from 'react';
import {
  Form,
  FormField,
  Label,
  Input,
  SubmitButton,
  StyledSelect
} from './styles';
import {NamedRoutes, namedRoutes} from './namedRoutes';

interface MessageFormProps {
  onSubmit: (data: { title: string; body: string; serverKey: string; route: string }) => void;
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

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState('');
  const [serverKey, setServerKey] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body, serverKey, route: selectedValue });
  };

  const handleSelectChange = (selectedOption) => {
    console.log('Selecionei: ', selectedOption);
    setSelectedValue(selectedOption.value);
  };

  const options = transformDataToOptions(namedRoutes);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Label>Server Key:</Label>
        <Input type="text" value={serverKey} onChange={(e) => setServerKey(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Title:</Label>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Body:</Label>
        <Input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
      </FormField>
      <FormField>
        <Label>Route:</Label>
        <StyledSelect options={options} onChange={handleSelectChange} value={options.find(option => option.value === selectedValue)}/>
      </FormField>
      <SubmitButton type="submit">Send Notification</SubmitButton>
    </Form>
  );
};
