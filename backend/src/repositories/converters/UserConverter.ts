import { User } from '../../core/user/model/User';
import { IUser } from '../../externals/db/mongoose/models/UserMongoose';

export class UserConverter {
  static fromDb(user: IUser): User {
    return new User({
      id: user._id?.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
    });
  }

  static toDb(user: User): Partial<IUser> {
    return {
      _id: user.id?.toString() as any,
      name: user.name,
      email: user.email,
      roles: user.roles,
      phoneNumber: user.phoneNumber,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isDeleted: user.isDeleted,
      deletedAt: user.deletedAt,
    };
  }
}
