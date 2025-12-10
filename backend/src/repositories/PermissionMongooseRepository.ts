import {
  FilterPaginate,
  Permission,
  PermissionRepository,
  ResultPaginate,
  FilterPermission,
} from '../core';
import { PermissionMongoose, IPermission } from '../externals/db/mongoose';

import { PermissionConverter } from './converters/PermissionConverter';
import { injectable } from 'inversify';
import { FilterQuery } from 'mongoose';
import {
  equalsId,
  equasIgnoreCase,
  likeIgnoreCase,
  notEqualsId,
} from './utils';
import console from 'node:console';

@injectable()
export class PermissionMongooseRepository implements PermissionRepository {
  async findAll(filter?: FilterPermission): Promise<Permission[]> {
    const _filter = await this.fillFilter(filter ?? {});
    const permissions = await PermissionMongoose.find(_filter);
    return permissions.map((permission: IPermission) =>
      PermissionConverter.fromDb(permission)
    );
  }

  async paginate(
    filter: FilterPaginate<FilterPermission>
  ): Promise<ResultPaginate<Permission>> {
    const _filter = await this.fillFilter(filter.filter);
    const count = await PermissionMongoose.countDocuments(_filter);

    const result = await PermissionMongoose.find(_filter)
      .limit(filter.limit)
      .skip(filter.limit * filter.page)
      .sort({ createdAt: -1 });

    return new ResultPaginate(
      filter.page,
      filter.limit,
      count,
      result.map((role) => PermissionConverter.fromDb(role))
    );
  }

  async findById(id: string): Promise<Permission | null> {
    const permissionMongoose = await PermissionMongoose.findById(id);
    if (!permissionMongoose) {
      return null;
    }
    return PermissionConverter.fromDb(permissionMongoose);
  }

  async create(permission: Permission): Promise<Permission> {
    const result = await PermissionMongoose.create(
      PermissionConverter.toDb(permission)
    );
    return PermissionConverter.fromDb(result);
  }

  async update(permission: Permission): Promise<void> {
    await PermissionMongoose.findByIdAndUpdate(
      permission.id,
      PermissionConverter.toDb(permission)
    );
  }

  async delete(id: string): Promise<void> {
    await PermissionMongoose.deleteById(id);
  }

  async findOneByFilter(filter: FilterPermission): Promise<Permission | null> {
    const permission = await PermissionMongoose.findOne(filter);
    if (!permission) {
      return null;
    }
    return PermissionConverter.fromDb(permission);
  }

  async exists(filter: FilterPermission): Promise<boolean> {
    const _filter = await this.fillFilter(filter);
    const count = await PermissionMongoose.countDocuments(_filter);
    return count > 0;
  }

  private async fillFilter(
    _filter: FilterPermission
  ): Promise<FilterQuery<IPermission>> {
    const filter: FilterQuery<IPermission> = {};

    if (_filter.resource) {
      filter.resource = equasIgnoreCase(_filter.resource);
    }

    if (_filter.action) {
      filter.action = likeIgnoreCase(_filter.action);
    }

    if (_filter.description) {
      filter.description = equasIgnoreCase(_filter.description);
    }

    if (_filter.descriptionLike) {
      filter.descriptionLike = likeIgnoreCase(_filter.descriptionLike);
    }

    if (_filter.id) {
      filter._id = equalsId(_filter.id);
    }

    if (_filter.idNotEquals) {
      filter._id = notEqualsId(_filter.idNotEquals);
    }

    if (_filter.resources) {
      filter.resource = { $in: _filter.resources };
    }

    return filter;
  }
}
