import { ICreateUser } from './CreateUser';

export interface IUpdateUser extends ICreateUser {
  id: string;
}
