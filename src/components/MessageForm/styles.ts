/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import Select from 'react-select';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
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

export const darkThemeStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#3b3b3b',
    color: 'white',
    borderColor: '#ddd',
    height: '42px',
    '&:hover': {
      borderColor: '#ddd' 
   }
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
    borderColor: '#646cff',
  })
};

export const StyledSelect = styled(Select).attrs({
  styles: darkThemeStyles
})``;