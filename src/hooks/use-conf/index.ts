import { useContext } from 'react';
import { ConfContext } from './use-conf';

export * from './use-conf';

export const useConf = () => {
  return useContext(ConfContext);
};