import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

type ConfContextData = {
  serverKey: string;
  saveSettings: (props: {serverKey: string}) => Promise<void>;
};

type ConfProviderProps = {
  children: ReactNode;
};

export const ConfContext = createContext({} as ConfContextData);

export function ConfProvider({ children }: ConfProviderProps) {
  const [serverKey, setServerKey] = useState<string>('');

  async function saveSettings(props: {serverKey: string}) {
    setServerKey(props.serverKey ?? '');
  }

  // useEffect(() => {
  //   //Buscar do servidor e preencher aqui;
  //   setServerKey('');
  // },[])

  return (
    <ConfContext.Provider value={{ serverKey, saveSettings }}>
      {children}
    </ConfContext.Provider>
  );
}
