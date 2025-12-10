import mongoose from 'mongoose';
import { createSchemaWithSoftDelete } from '../utils/createSchema';
import { ISoftDeletedDocument, ISoftDeletedModel } from '../utils/softDelete';

export interface IPermission extends ISoftDeletedDocument {
  resource: string;
  action: string;
  description: string;
}

const permissionSchema = createSchemaWithSoftDelete({
  resource: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const PermissionMongoose = mongoose.model<
  IPermission,
  ISoftDeletedModel<IPermission>
>('Permission', permissionSchema);
