import { useContext } from 'react';
import { UserContext } from './use-session';

export * from './use-auth';
export * from './use-session';

export const useSession = () => {
  const { user } = useContext(UserContext)
  return user
}
