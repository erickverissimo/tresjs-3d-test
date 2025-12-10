import { PermissionRepository } from '../provider/PermissionRepository';
import { UseCase } from '../../shared/UseCase';
import { Permission } from '../model/Permission';
import { FilterPermission } from '../filter';
import { inject, injectable } from 'inversify';

@injectable()
export class FindAllPermissionsUseCase
  implements UseCase<FilterPermission | undefined, Permission[]>
{
  constructor(
    @inject(PermissionRepository)
    private readonly repository: PermissionRepository
  ) {}

  execute(filter?: FilterPermission): Promise<Permission[]> {
    return this.repository.findAll(filter);
  }
}
