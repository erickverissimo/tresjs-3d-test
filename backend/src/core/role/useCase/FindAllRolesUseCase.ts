import { RoleRepository } from '../provider';
import { UseCase } from '../../shared';
import { FilterRole } from '../filter';
import { inject, injectable } from 'inversify';
import { Role } from '../model';

@injectable()
export class FindAllRolesUseCase
  implements UseCase<FilterRole | undefined, Role[]>
{
  constructor(
    @inject(RoleRepository)
    private readonly repository: RoleRepository,
  ) {}

  async execute(filter?: FilterRole): Promise<Role[]> {
    return this.repository.findAll(filter);
  }
}
