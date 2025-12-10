import { inject, injectable } from 'inversify';
import { PermissionRepository } from '../provider';
import { AppValidationError } from '../../../errors';
import { Errors } from '../../shared';
import { Permission } from '../model/Permission';

@injectable()
export class FindPermissionByIdService {
  constructor(
    @inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository
  ) {}

  async execute(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new AppValidationError(Errors.PERMISSION_NOT_FOUND);
    }
    return permission;
  }
}
