import styled from 'styled-components';

export const UploadContainer = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  width: 400px;
  height: 128px;
`;

export const UploadButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

type TabProps = { isActive: boolean };

export const Content = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  display: flex;
  height: 46px;
`;

export const TabContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Tab = styled.button<TabProps>`
  padding: 10px 20px;
  border: 1px solid transparent;
  background-color: #1a1a1a; // Default dark background
  color: rgba(255, 255, 255, 0.87); // Light text color
  cursor: pointer;
  transition: border-color 0.25s;

  border-color: ${(props) => (props.isActive ? '#646cff' : 'none')};

  &:hover {
    border-color: #646cff; // Hover effect as per global style
  }

  &.active {
    background-color: #646cff; // Active tab color
    color: white;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    background-color: #f9f9f9; // Light background for light mode
    color: #213547; // Dark text for light mode

    &.active {
      background-color: #747bff; // Active tab color for light mode
      color: white;
    }
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

export const FileInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;