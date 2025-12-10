import mongoose from 'mongoose';
import { createSchemaWithSoftDelete } from '../utils/createSchema';
import { ISoftDeletedDocument, ISoftDeletedModel } from '../utils/softDelete';

export interface IUser extends ISoftDeletedDocument {
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  password: string | null;
}

const userSchema = createSchemaWithSoftDelete({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: [],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
});

export const UserMongoose = mongoose.model<IUser, ISoftDeletedModel<IUser>>(
  'User',
  userSchema
);
