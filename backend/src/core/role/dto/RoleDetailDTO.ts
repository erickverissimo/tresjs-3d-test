import { RolePermission } from '../model/RolePermission';

export interface RoleDetailDTO {
  id: string;
  name: string;
  description: string;
  permissions: RolePermission[];
  createdAt: Date;
  updatedAt: Date;
}
