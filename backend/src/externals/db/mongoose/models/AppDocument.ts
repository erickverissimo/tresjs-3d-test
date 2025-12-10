import mongoose, { Document } from 'mongoose';

export interface AppDocument<T = mongoose.Schema.Types.ObjectId>
  extends Document<T> {
  createdAt: Date;
  updatedAt: Date;
}
