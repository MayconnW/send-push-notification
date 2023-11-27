import {
  createContext,
  ReactNode,
  useState,
} from 'react';

export type Route = 'setting' | 'sendPush';

type RouteContextData = {
  route: Route;
  changeRoute: (route: Route) => void;
};

type RouteProviderProps = {
  children: ReactNode;
};

export const RouteContext = createContext({} as RouteContextData);

export function RouteProvider({ children }: RouteProviderProps) {
  const [route, setRoute] = useState<Route>('setting');

  return (
    <RouteContext.Provider value={{ route, changeRoute: setRoute }}>
      {children}
    </RouteContext.Provider>
  );
}
