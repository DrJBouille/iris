import { useEffect } from 'react';
import { signalingService } from './service/signaling-service';
import AuthProvider from './authentication/auth-provider';
import HomePage from './chat/home-page';

export function App() {
  useEffect(() => {
    signalingService.connect();
  }, []);

  return (<AuthProvider><HomePage/></AuthProvider>);
}

export default App;
