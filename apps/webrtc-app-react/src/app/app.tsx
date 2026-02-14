import AuthProvider from './authentication/auth-provider';
import HomePage from './chat/home-page';

export function App() {
  return (<AuthProvider><HomePage/></AuthProvider>);
}

export default App;
