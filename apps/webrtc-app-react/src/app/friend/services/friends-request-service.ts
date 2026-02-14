import { apiCall } from '../../service/axios-api-call';
import { FriendRequest } from '../types/FriendRequest';
import { FriendRequestDTO } from '../types/FriendRequestDTO';

export const getReceivedFriendRequests = () => apiCall<FriendRequest[]>('get', '/friend-requests/received');
export const getSendFriendRequests = () => apiCall<FriendRequest[]>('get', '/friend-requests/send');
export const sendFriendRequest = (friendRequestDTO: FriendRequestDTO) => apiCall<FriendRequest>('post', '/friend-requests', friendRequestDTO);
export const acceptFriendRequest = (id: string) => apiCall<FriendRequest>('put', `/friend-requests/accept/${id}`);
export const rejectFriendRequest = (id: string) => apiCall<FriendRequest>('put', `/friend-requests/reject/${id}`);
export const cancelFriendRequest = (id: string) => apiCall<FriendRequest>('put', `/friend-requests/cancel/${id}`);
