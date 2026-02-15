import AuthProvider from './authentication/auth-provider';
import HomePage from './main/home-page';

export function App() {
  return (<AuthProvider><HomePage/></AuthProvider>);
}

export default App;
