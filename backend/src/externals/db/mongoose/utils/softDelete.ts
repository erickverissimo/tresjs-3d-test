import { AppDocument } from '../models/AppDocument';
import { Model, Query, Schema } from 'mongoose';

export interface ISoftDeletedDocument<T = Schema.Types.ObjectId>
  extends AppDocument<T> {
  isDeleted: boolean;
  withDeleted: boolean;
  deletedAt: Date | null;
  softDelete: () => Promise<this>;
  restore: () => Promise<this>;
}

export interface ISoftDeletedModel<T extends ISoftDeletedDocument>
  extends Model<T> {
  deleteById: (id: string) => Promise<T>;
}

interface IQueryMethods {
  isDeleted: (condition: boolean) => Query<ISoftDeletedDocument, any, any, any>;
}

export type ISoftDeletedQuery = Query<ISoftDeletedDocument, any, any, any> &
  IQueryMethods;

export default function (schema: Schema, _options: any) {
  schema.add({ isDeleted: Boolean });
  schema.add({ deletedAt: Date });

  schema.pre('save', function (next) {
    if (!this.isDeleted) {
      this.isDeleted = false;
    }

    if (!this.deletedAt) {
      this.deletedAt = null;
    }

    next();
  });

  schema.pre(
    [
      'find',
      'findOne',
      'findOneAndUpdate',
      'count',
      'update',
      'updateOne',
      'updateMany',
      'countDocuments',
    ] as any,
    function () {
      const currentQuery = (this as any).getQuery();
      if (currentQuery.withDeleted !== true) {
        (this as any).where({ isDeleted: currentQuery.isDeleted === true });
      }
    }
  );

  schema.methods.softDelete = function () {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = function () {
    this.isDeleted = false;
    this.deletedAt = null;
    return this.save();
  };

  schema.static('deleteById', async function (id: string) {
    const model = await this.findById(id);
    return model.softDelete();
  });

  (schema.query as any).isDeleted = async function (cond = true) {
    return this.find({
      isDeleted: cond,
    });
  };

  (schema.query as any).withDeleted = async function (cond = true) {
    return this.find({
      withDeleted: cond,
    });
  };
}
