import { User } from '../../authentication/type/User';

export enum ActiveTab {
  DISCUSSION,
  FRIEND
}

export interface ActiveTabValue {
  activeTab: ActiveTab;
  user?: User;
}
