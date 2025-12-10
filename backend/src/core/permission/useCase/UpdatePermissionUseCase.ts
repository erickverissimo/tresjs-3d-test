import { PermissionRepository } from '../provider/PermissionRepository';
import { UseCase } from '../../shared';
import { Permission, PermissionProps } from '../model/Permission';
import { UpdatePermissionDTO } from '../dto';
import { injectable, inject } from 'inversify';
import { FindPermissionByIdService } from '../service';

@injectable()
export class UpdatePermissionUseCase
  implements UseCase<PermissionProps, Permission>
{
  constructor(
    @inject(PermissionRepository)
    private readonly repository: PermissionRepository,
    @inject(FindPermissionByIdService)
    private readonly findPermissionByIdService: FindPermissionByIdService
  ) {}

  async execute(dto: UpdatePermissionDTO): Promise<Permission> {
    const permission = await this.findPermissionByIdService.execute(dto.id);

    permission.update(dto);
    await this.repository.update(permission);

    return permission;
  }
}
