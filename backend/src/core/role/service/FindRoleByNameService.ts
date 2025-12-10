import { inject, injectable } from 'inversify';
import { RoleRepository } from '../provider';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { Role } from '../model/Role';

export interface IFindRoleByNameFilter {
  name: string;
  companyId?: string;
  systemRole?: boolean;
}
@injectable()
export class FindRoleByNameService {
  constructor(
    @inject(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(filter: IFindRoleByNameFilter): Promise<Role> {
    const role = await this.roleRepository.findOneByFilter({
      name: filter.name,
      companyId: filter.companyId,
      systemRole: filter.systemRole,
    });

    if (!role) {
      throw new AppObjectNotFoundError(Errors.ROLE_NOT_FOUND);
    }

    return role;
  }
}
