import { apiCall } from './axios-api-call';
import { User } from '../authentication/type/User';

export const getUsers = () => apiCall<User[]>('get', '/users');
