import { useContext, createContext } from 'react';
import { User } from './type/User';

export const AuthContext = createContext<User | undefined>(undefined)

export function useAuth() {
  return useContext(AuthContext);
}
