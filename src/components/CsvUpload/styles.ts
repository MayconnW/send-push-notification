import styled from 'styled-components';

export const UploadContainer = styled.div`
  text-align: center;
  width: 460px;
`;

type TabProps = { active: number };

export const Content = styled.div`
  padding: 20px 0;
  display: flex;
  width: 100%;
`;

export const TabContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 0px;
`;

export const Tab = styled.button<TabProps>`
  padding: 10px 20px;
  border: 1px solid transparent;
  background-color: #1a1a1a; // Default dark background
  color: rgba(255, 255, 255, 0.87); // Light text color
  cursor: pointer;
  transition: border-color 0.25s;

  border-color: ${(props) => (props.active ? '#ddd' : 'none')};
  outline: ${(props) => props.active ? '4px auto -webkit-focus-ring-color' : 'none'};

  &:hover {
    border-color: #ddd; // Hover effect as per global style
  }

  &.active {
    background-color: #ddd; // Active tab color
    color: white;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  background: rgb(59 59 59);
`;

export const FileInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  background: rgb(59 59 59);
`;