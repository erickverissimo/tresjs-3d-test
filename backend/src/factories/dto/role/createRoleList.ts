import { Role, RoleListDTO } from '../../../core';

export function createRoleList({ id, name, description }: Role): RoleListDTO {
  return {
    id: id ?? '',
    name,
    description,
  };
}
