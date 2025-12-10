import { RoleRepository } from '../provider/RoleRepository';
import { UseCase } from '../../shared';
import { Role } from '../model/Role';
import { UpdateRoleDTO } from '../dto';
import { injectable, inject } from 'inversify';
import { FindPermissionByIdService } from '../../permission';
import { FindRoleByIdService } from '../service';

@injectable()
export class UpdateRoleUseCase implements UseCase<UpdateRoleDTO, Role> {
  constructor(
    @inject(RoleRepository)
    private readonly repository: RoleRepository,
    @inject(FindRoleByIdService)
    private readonly findRoleByIdService: FindRoleByIdService,
    @inject(FindPermissionByIdService)
    private readonly findPermissionByIdService: FindPermissionByIdService
  ) {}

  async execute(dto: UpdateRoleDTO): Promise<Role> {
    const role = await this.findRoleByIdService.execute(dto.id);

    const permissions = await Promise.all(
      dto.permissionsIds.map((permissionId) =>
        this.findPermissionByIdService.execute(permissionId)
      )
    );

    role.update({
      name: role.name,
      description: dto.description,
      permissions: permissions.map((permission) => ({
        id: permission.id!,
        action: permission.action,
        resource: permission.resource,
        description: permission.description,
      })),
    });

    await this.repository.update(role);

    return role;
  }
}
