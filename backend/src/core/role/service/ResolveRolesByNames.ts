import { inject, injectable } from 'inversify';
import { AppObjectNotFoundError } from '../../../errors';
import { Role, RoleRepository } from '..';
import { Errors } from '../../shared';

export interface ResolveRolesByNamesInput {
  names: string[];
  companyId?: string | null;
  vendorId?: string | null;
}

@injectable()
export class ResolveRolesByNames {
  constructor(
    @inject(RoleRepository) private readonly roleRepository: RoleRepository
  ) {}

  async execute({
    names,
    companyId,
    vendorId,
  }: ResolveRolesByNamesInput): Promise<Role[]> {
    if (!names.length) {
      return [];
    }

    const roles: Role[] = [];
    for (const name of names) {
      const role = await this.roleRepository.findOneByFilter({
        name,
        companyId,
        vendorId,
      });
      if (!role) {
        throw new AppObjectNotFoundError(Errors.ROLE_NOT_FOUND);
      }
      roles.push(role);
    }
    return roles;
  }
}
