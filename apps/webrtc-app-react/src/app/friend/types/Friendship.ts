import { User } from '../../authentication/type/User';

export interface Friendship {
  id: string;
  sender: User;
  receiver: User;
  createdAt: string;
}
