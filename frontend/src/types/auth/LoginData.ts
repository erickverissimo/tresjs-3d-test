import { IGetPermission } from '../permissions';
import { IGetUser } from '../users';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: IGetUser;
  permissions: IGetPermission[];
}
