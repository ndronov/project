import type { UserStatus } from './enums';

export interface UserReference {
  id: string;
  nickName: string;
  registered: number;
  status: UserStatus;
}
