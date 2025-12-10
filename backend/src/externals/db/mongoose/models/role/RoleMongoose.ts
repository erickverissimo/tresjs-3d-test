import mongoose from 'mongoose';
import { createSchemaWithSoftDelete } from '../../utils/createSchema';
import {
  ISoftDeletedDocument,
  ISoftDeletedModel,
} from '../../utils/softDelete';
import {
  IRolePermission,
  rolePermissionSchema,
} from './RolePermissionMongoose';

export interface IRole extends ISoftDeletedDocument {
  name: string;
  description: string;
  permissions: IRolePermission[];
}

const roleSchema = createSchemaWithSoftDelete({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: {
    type: [rolePermissionSchema],
    required: true,
    default: [],
  },
});

export const RoleMongoose = mongoose.model<IRole, ISoftDeletedModel<IRole>>(
  'Role',
  roleSchema
);
