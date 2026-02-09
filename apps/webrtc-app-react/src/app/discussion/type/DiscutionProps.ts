import { User } from '../../authentication/type/User';

export interface DiscutionProps {
  user: User
  call: (receiver: string) => Promise<void>
  currentCallWidth: string | null
  hangup: () => void
}
