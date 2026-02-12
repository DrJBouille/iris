import { useEffect } from 'react';
import { signalingService } from './service/signalingService';
import AuthProvider from './authentication/auth-provider';
import HomePage from './chat/homePage';

export function App() {
  useEffect(() => {
    signalingService.connect();
  }, []);

  return (<AuthProvider><HomePage/></AuthProvider>);
}

export default App;
