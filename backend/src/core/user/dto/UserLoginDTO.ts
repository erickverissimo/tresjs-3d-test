import { UserDetailDTO } from './UserDetailDTO';

export interface UserLogin {
  user: UserDetailDTO;
  token: string;
  permissions: string[];
}
