import { injectable, inject } from 'inversify';
import { RoleRepository } from '../provider/RoleRepository';
import { UseCase, roleCodeNameFormatter } from '../../shared';
import { Role, RoleProps } from '../model/Role';
import { CreateRoleDTO } from '../dto';
import { FindPermissionByIdService } from '../../permission';

@injectable()
export class CreateRoleUseCase implements UseCase<CreateRoleDTO, Role> {
  constructor(
    @inject(RoleRepository)
    private readonly repository: RoleRepository,
    @inject(FindPermissionByIdService)
    private readonly findPermissionByIdService: FindPermissionByIdService
  ) {}

  async execute(dto: CreateRoleDTO, session?: any): Promise<Role> {
    const permissions = await Promise.all(
      dto.permissionsIds.map((permissionId) =>
        this.findPermissionByIdService.execute(permissionId)
      )
    );

    const roleName = roleCodeNameFormatter(dto.name);

    const role = new Role({
      name: roleName,
      description: dto.description,
      permissions: permissions.map((permission) => ({
        id: permission.id!,
        action: permission.action,
        resource: permission.resource,
        description: permission.description,
      })),
    });
    return this.repository.create(role, session);
  }
}
