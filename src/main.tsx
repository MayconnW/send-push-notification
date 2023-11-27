import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useAuth } from './hooks/use-session';
import SignIn from './SignIn.tsx'
import { Providers } from './hooks/providers.tsx'
import { RouteProvider } from './hooks/use-route';

export const Main = () => {
  const { initializing, user } = useAuth();

  if (initializing) {
    return <div>Loading...</div>; // Or replace with a loading spinner
  }

  console.log('user', {user});

  return (
    <Providers>
      { user ? (
        <RouteProvider>
          <App />
        </RouteProvider>
      ) : (
        <SignIn />
      )}
    </Providers>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
