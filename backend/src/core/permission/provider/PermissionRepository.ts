import { injectable } from 'inversify';
import { Permission } from '../model/Permission';
import { FilterPermission } from '../filter';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export abstract class PermissionRepository {
  abstract findAll(filter?: FilterPermission): Promise<Permission[]>;
  abstract paginate(
    filter: FilterPaginate<FilterPermission>
  ): Promise<ResultPaginate<Permission>>;
  abstract findById(id: string): Promise<Permission | null>;
  abstract create(permission: Permission): Promise<Permission>;
  abstract update(permission: Permission): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOneByFilter(
    filter: FilterPermission
  ): Promise<Permission | null>;
  abstract exists(filter: FilterPermission): Promise<boolean>;
}
