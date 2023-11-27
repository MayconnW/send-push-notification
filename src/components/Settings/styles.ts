import styled from 'styled-components';
import { Button } from '@chakra-ui/react';

export const Form = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 18px;
`;

export const FormField = styled.div`
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  width: 100%;

`;

export const Label = styled.label`
  margin-bottom: 2px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  padding: 10px 20px;
  margin-top: 12px;
  width: 100%;
`;
