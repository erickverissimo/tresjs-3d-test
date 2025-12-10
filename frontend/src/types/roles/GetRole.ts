import { IGetPermission } from '../permissions';

export interface IGetRole {
  id: string;
  name: string;
  description: string;
  permissions: IGetPermission[];
  createdAt: Date;
  updatedAt: Date;
}
