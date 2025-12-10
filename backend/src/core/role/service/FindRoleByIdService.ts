import { inject, injectable } from 'inversify';
import { RoleRepository } from '../provider';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { Role } from '../model/Role';

@injectable()
export class FindRoleByIdService {
  constructor(
    @inject(RoleRepository)
    private readonly roleRepository: RoleRepository
  ) {}

  async execute(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new AppObjectNotFoundError(Errors.ROLE_NOT_FOUND);
    }

    return role;
  }
}
