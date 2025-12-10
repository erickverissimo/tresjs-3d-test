import { Role } from '../../core/role/model/Role';
import { IRole } from '../../externals/db/mongoose/models/role/RoleMongoose';

export class RoleConverter {
  static fromDb(role: IRole): Role {
    return new Role({
      id: role._id?.toString(),
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((permission) => {
        return {
          id: permission.id.toString(),
          resource: permission.resource,
          action: permission.action,
          description: permission.description,
        };
      }),
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      isDeleted: role.isDeleted,
      deletedAt: role.deletedAt,
    });
  }

  static toDb(role: Role): Partial<IRole> {
    return {
      _id: role.id?.toString() as any,
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((permission) => {
        return {
          id: permission.id?.toString() as any,
          resource: permission.resource,
          action: permission.action,
          description: permission.description,
        };
      }),
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      isDeleted: role.isDeleted,
      deletedAt: role.deletedAt,
    };
  }
}
