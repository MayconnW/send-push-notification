/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import Select from 'react-select';

export const Form = styled.form`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #008CBA;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #007B9E;
  }
`;

export const darkThemeStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#3b3b3b',
    color: 'white',
    borderColor: '#646cff'
  }),
  option: (styles: any, { isFocused }: any) => {
    return {
      ...styles,
      backgroundColor: isFocused ? '#535bf2' : '#3b3b3b',
      color: 'white'
    };
  },
  singleValue: (styles: any) => ({
    ...styles,
    color: 'white',
  }),
  menu: (styles: any) => ({
    ...styles,
    backgroundColor: '#3b3b3b',
    borderColor: '#646cff'
  })
};

export const StyledSelect = styled(Select).attrs({
  styles: darkThemeStyles
})``;