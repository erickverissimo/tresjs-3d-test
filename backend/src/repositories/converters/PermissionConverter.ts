import { Permission } from '../../core/permission';
import { IPermission } from '../../externals/db/mongoose/models/PermissionMongoose';

export class PermissionConverter {
  static fromDb(permission: IPermission): Permission {
    return new Permission({
      id: permission._id?.toString(),
      resource: permission.resource,
      action: permission.action,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      isDeleted: permission.isDeleted,
      deletedAt: permission.deletedAt,
    });
  }

  static toDb(permission: Permission): Partial<IPermission> {
    return {
      _id: permission.id?.toString() as any,
      resource: permission.resource,
      action: permission.action,
      description: permission.description,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      isDeleted: permission.isDeleted,
      deletedAt: permission.deletedAt,
    };
  }
}
