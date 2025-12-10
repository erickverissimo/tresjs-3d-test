import { injectable, inject } from 'inversify';
import { PermissionRepository } from '../provider/PermissionRepository';
import { UseCase } from '../../shared/UseCase';
import { Permission, PermissionProps } from '../model/Permission';
import { CreatePermissionDTO } from '../dto';

@injectable()
export class CreatePermissionUseCase
  implements UseCase<PermissionProps, Permission>
{
  constructor(
    @inject(PermissionRepository)
    private readonly repository: PermissionRepository
  ) {}

  async execute(permission: CreatePermissionDTO): Promise<Permission> {
    const newPermission = new Permission(permission);
    return this.repository.create(newPermission);
  }
}
