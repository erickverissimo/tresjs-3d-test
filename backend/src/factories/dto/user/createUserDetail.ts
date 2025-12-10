import { User, UserDetailDTO } from '../../../core';

export function createUserDetail({
  id,
  name,
  email,
  phoneNumber,
  roles,

  createdAt,
  updatedAt,
  isDeleted,
  deletedAt,
}: User): UserDetailDTO {
  return {
    id: id ?? '',
    name,
    roles,
    email,
    phoneNumber,
    createdAt,
    updatedAt,
    isDeleted,
    deletedAt,
  };
}
