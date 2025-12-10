import { Permission, PermissionDetailDTO } from '../../../core';

export function createPermissionDetail({
  id,
  resource,
  action,
  description,
  createdAt,
  updatedAt,
}: Permission): PermissionDetailDTO {
  return {
    id: id ?? '',
    resource,
    action,
    description,
    createdAt,
    updatedAt,
  };
}
