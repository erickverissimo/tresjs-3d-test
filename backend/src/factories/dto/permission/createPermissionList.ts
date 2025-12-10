import { Permission, PermissionListDTO } from '../../../core';

export function createPermissionList({
  id,
  resource,
  action,
  description,
}: Permission): PermissionListDTO {
  return {
    id: id ?? '',
    resource: resource,
    action: action,
    description: description,
  };
}
