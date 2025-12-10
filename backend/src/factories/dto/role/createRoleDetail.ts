import { Role, RoleDetailDTO } from '../../../core';

export function createRoleDetail({
  id,
  name,
  description,
  permissions,
  createdAt,
  updatedAt,
}: Role): RoleDetailDTO {
  return {
    id: id ?? '',
    name,
    description,
    permissions,
    createdAt,
    updatedAt,
  };
}
