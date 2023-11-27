import { ReactNode, createContext } from "react";
import { User } from 'firebase/auth';
import { useAuth } from ".";

export const UserContext = createContext<{user: User | null}>({
  user: null,
})

export function SessionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
