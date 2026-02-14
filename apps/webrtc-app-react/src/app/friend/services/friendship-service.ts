import { apiCall } from '../../service/axios-api-call';
import { User } from '../../authentication/type/User';

export const getFriends = () => apiCall<User[]>('get', '/friendships');
