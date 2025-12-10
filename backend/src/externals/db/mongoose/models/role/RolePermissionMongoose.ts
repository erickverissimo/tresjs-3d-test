import mongoose from 'mongoose';

export interface IRolePermission {
  id: mongoose.Schema.Types.ObjectId;
  resource: string;
  action: string;
  description: string;
}

export const rolePermissionSchema = new mongoose.Schema<IRolePermission>(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
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
  },
  {
    _id: false,
    timestamps: false,
  }
);
