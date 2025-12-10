import { User, UserListDTO } from '../../../core';

export function createUserList(user: User): UserListDTO {
  return {
    id: user.id ?? '',
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
