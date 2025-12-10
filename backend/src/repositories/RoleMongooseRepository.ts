import { injectable } from 'inversify';
import { FilterQuery } from 'mongoose';
import {
  equalsId,
  equasIgnoreCase,
  likeIgnoreCase,
  notEqualsId,
} from './utils';

import {
  FilterPaginate,
  FilterRole,
  ResultPaginate,
  Role,
  RoleRepository,
} from '../core';
import { RoleMongoose, IRole } from '../externals/db/mongoose';
import { RoleConverter } from './converters/RoleConverter';

@injectable()
export class RoleMongooseRepository implements RoleRepository {
  async findAll(filter?: FilterRole): Promise<Role[]> {
    const _filter = await this.fillFilter(filter ?? {});
    const roles = await RoleMongoose.find(_filter);
    return roles.map((role: IRole) => RoleConverter.fromDb(role));
  }

  async paginate(
    filter: FilterPaginate<FilterRole>
  ): Promise<ResultPaginate<Role>> {
    const _filter = await this.fillFilter(filter.filter);
    const count = await RoleMongoose.countDocuments(_filter);

    const result = await RoleMongoose.find(_filter)
      .limit(filter.limit)
      .skip(filter.limit * filter.page)
      .sort({ createdAt: -1 });

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      result.map((role) => RoleConverter.fromDb(role))
    );
  }

  async findById(id: string): Promise<Role | null> {
    const roleMongoose = await RoleMongoose.findById(id);
    if (!roleMongoose) {
      return null;
    }
    return RoleConverter.fromDb(roleMongoose);
  }

  async create(role: Role, session?: any): Promise<Role> {
    const [result] = await RoleMongoose.create([RoleConverter.toDb(role)], {
      session,
    });
    return RoleConverter.fromDb(result);
  }

  async update(role: Role): Promise<void> {
    await RoleMongoose.findByIdAndUpdate(role.id, RoleConverter.toDb(role));
  }

  async delete(id: string): Promise<void> {
    await RoleMongoose.findByIdAndDelete(id);
  }

  async findOneByFilter(filter: FilterRole): Promise<Role | null> {
    const _filter = await this.fillFilter(filter);
    const role = await RoleMongoose.findOne(_filter);
    if (!role) {
      return null;
    }
    return RoleConverter.fromDb(role);
  }

  async findOneForLogin(filter: FilterRole): Promise<Role | null> {
    const _filter = await this.fillFilter(filter);

    const role = await RoleMongoose.findOne(_filter);
    if (!role) {
      return null;
    }
    return RoleConverter.fromDb(role);
  }

  async exists(filter: FilterRole): Promise<boolean> {
    const _filter = await this.fillFilter(filter);
    const count = await RoleMongoose.countDocuments(_filter);
    return count > 0;
  }

  private async fillFilter(_filter: FilterRole): Promise<FilterQuery<IRole>> {
    const filter: FilterQuery<IRole> = {};

    if (_filter.name) {
      filter.name = equasIgnoreCase(_filter.name);
    }

    if (_filter.nameLike) {
      filter.name = likeIgnoreCase(_filter.nameLike);
    }

    if (_filter.id) {
      filter._id = equalsId(_filter.id);
    }

    if (_filter.idNotEquals) {
      filter._id = notEqualsId(_filter.idNotEquals);
    }

    if (_filter.systemRole) {
      filter.systemRole = _filter.systemRole;
    } else {
      filter.systemRole = false;
    }

    if (_filter.companyId) {
      filter.companyId = equalsId(_filter.companyId);
    }

    if (_filter.vendorId) {
      filter.vendorId = equalsId(_filter.vendorId);
    }

    return filter;
  }
}
