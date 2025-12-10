import { injectable } from 'inversify';
import { Role } from '../model/Role';
import { FilterRole } from '../filter/FilterRole';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export abstract class RoleRepository {
  abstract findAll(filter?: FilterRole): Promise<Role[]>;
  abstract paginate(
    filter: FilterPaginate<FilterRole>
  ): Promise<ResultPaginate<Role>>;
  abstract findById(id: string): Promise<Role | null>;
  abstract create(role: Role, session?: any): Promise<Role>;
  abstract update(role: Role): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOneByFilter(filter: FilterRole): Promise<Role | null>;
  abstract findOneForLogin(filter: FilterRole): Promise<Role | null>;
  abstract exists(filter: FilterRole): Promise<boolean>;
}
