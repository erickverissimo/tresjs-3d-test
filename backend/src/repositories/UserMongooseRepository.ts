import { ClientSession, FilterQuery } from 'mongoose';
import {
  equalsId,
  equasIgnoreCase,
  likeIgnoreCase,
  notEqualsId,
  notEqualsIgnoreCase,
} from './utils';

import {
  User,
  UserRepository,
  ResultPaginate,
  FilterPaginate,
  FilterUser,
  FilterPasswordRecover,
} from '../core';
import { UserMongoose, IUser } from '../externals/db/mongoose';
import { UserConverter } from './converters/UserConverter';

export class UserMongooseRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne(
      { email: equasIgnoreCase(email) },
      '+password'
    );
    if (!user) {
      return null;
    }
    return UserConverter.fromDb(user);
  }

  async findAll(filter?: FilterUser): Promise<User[]> {
    const _filter = await this.fillFilter(filter ?? {});
    const users = await UserMongoose.find(_filter);
    return users.map((user: IUser) => UserConverter.fromDb(user));
  }

  async paginate(
    filter: FilterPaginate<FilterUser>
  ): Promise<ResultPaginate<User>> {
    const _filter = await this.fillFilter(filter.filter);

    const count = await UserMongoose.countDocuments(_filter);

    const result = await UserMongoose.find(_filter)
      .limit(filter.limit)
      .skip(filter.limit * filter.page)
      .sort({ createdAt: -1 });

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      result.map((user) => UserConverter.fromDb(user))
    );
  }

  async findById(id: string): Promise<User | null> {
    const userMongoose = await UserMongoose.findById(id);
    if (!userMongoose) {
      return null;
    }
    return UserConverter.fromDb(userMongoose);
  }

  async create(user: User): Promise<User> {
    const result = await UserMongoose.create(UserConverter.toDb(user));
    return UserConverter.fromDb(result);
  }

  async update(user: User, session?: ClientSession): Promise<void> {
    await UserMongoose.findByIdAndUpdate(user.id, UserConverter.toDb(user), {
      session,
    });
  }

  async delete(id: string): Promise<void> {
    await UserMongoose.deleteById(id);
  }

  async exists(id: string): Promise<boolean> {
    const user = await UserMongoose.exists({ _id: id });
    return !!user;
  }

  async existsWithEmail(email: string, id?: string): Promise<boolean> {
    const user = await UserMongoose.exists({ email, _id: { $ne: id } });
    return !!user;
  }

  private async fillFilter(_filter: FilterUser): Promise<FilterQuery<IUser>> {
    const filter: FilterQuery<IUser> = {};

    if (_filter.searchFilter) {
      filter.$or = [
        {
          name: likeIgnoreCase(_filter.searchFilter),
        },
        {
          email: likeIgnoreCase(_filter.searchFilter),
        },
        {
          roles: { $in: [_filter.searchFilter] },
        },
      ];
    }
    if (_filter.name) {
      filter.name = equasIgnoreCase(_filter.name);
    }

    if (_filter.nameLike) {
      filter.name = likeIgnoreCase(_filter.nameLike);
    }

    if (_filter.email) {
      filter.email = _filter.email;
    }

    if (_filter.emailNotEquals) {
      filter.email = notEqualsIgnoreCase(_filter.emailNotEquals);
    }

    if (_filter.id) {
      filter._id = equalsId(_filter.id);
    }

    if (_filter.idNotEquals) {
      filter._id = notEqualsId(_filter.idNotEquals);
    }

    if (_filter.role) {
      filter.roles = { $in: [_filter.role] };
    }

    return filter;
  }
}
