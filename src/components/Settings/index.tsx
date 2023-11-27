/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Form,
  FormField,
  Label,
  Input,
  SubmitButton
} from './styles';
import { useConf } from '../../hooks/use-conf';
import { useRoute } from '../../hooks/use-route';
import { Flex } from '@chakra-ui/react';

export function Settings() {
  const { serverKey, saveSettings } = useConf();
  const { changeRoute } = useRoute();

  const [serverKeyInput, setServerKeyInput] = useState<string>(() => {
    return serverKey ?? '';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings({
      serverKey: serverKeyInput
    });
    changeRoute('sendPush');
    alert('Configurações salvas');
  };

  return (
    <Flex direction="column">
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label>Server Key</Label>
          <Input type="text" value={serverKeyInput} onChange={(e) => setServerKeyInput(e.target.value)} />
        </FormField>
        <SubmitButton type="submit">Save</SubmitButton>
      </Form>
    </Flex>
  );
}
