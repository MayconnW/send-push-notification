import { useContext } from 'react';
import { RouteContext } from './use-route';

export * from './use-route';

export const useRoute = () => {
  return useContext(RouteContext);
};