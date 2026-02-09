import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { signalingService } from './service/signalingService';
import ProtectedRoute from './authentication/protectedRoute';
import HomePage from './chat/homePage';
import { useSyncUser } from './authentication/useSyncUser';

export function App() {
  useSyncUser();

  useEffect(() => {
    signalingService.connect();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;
