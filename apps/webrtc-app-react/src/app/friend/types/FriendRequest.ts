import { User } from '../../authentication/type/User';
import { Status } from './Status';

export interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: Status;
  createedAt: Date;
}
