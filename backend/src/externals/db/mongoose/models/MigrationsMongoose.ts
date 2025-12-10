import mongoose from 'mongoose';
import { createSchemaWithSoftDelete } from '../utils/createSchema';
import { ISoftDeletedDocument, ISoftDeletedModel } from '../utils/softDelete';

export interface IMigration extends ISoftDeletedDocument {
  file: string;
}

const migrationsSchema = createSchemaWithSoftDelete({
  file: {
    type: String,
    unique: true,
    required: true,
  },
});

export const Migration = mongoose.model<
  IMigration,
  ISoftDeletedModel<IMigration>
>('Migrations', migrationsSchema);
