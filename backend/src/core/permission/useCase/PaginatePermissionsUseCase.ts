import { PermissionRepository } from '../provider/PermissionRepository';
import { UseCase } from '../../shared/UseCase';
import { Permission } from '../model/Permission';
import { FilterPermission } from '../filter';
import { inject, injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export class PaginatePermissionsUseCase
  implements
    UseCase<FilterPaginate<FilterPermission>, ResultPaginate<Permission>>
{
  constructor(
    @inject(PermissionRepository)
    private readonly repository: PermissionRepository
  ) {}

  execute(
    input: FilterPaginate<FilterPermission>
  ): Promise<ResultPaginate<Permission>> {
    return this.repository.paginate(input);
  }
}
