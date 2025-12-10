import { RoleRepository } from '../provider';
import { UseCase, FilterPaginate, ResultPaginate } from '../../shared';
import { FilterRole } from '../filter';
import { inject, injectable } from 'inversify';
import { Role } from '../model';

@injectable()
export class PaginateRolesUseCase
  implements UseCase<FilterPaginate<FilterRole>, ResultPaginate<Role>>
{
  constructor(
    @inject(RoleRepository)
    private readonly repository: RoleRepository,
  ) {}

  async execute(
    input: FilterPaginate<FilterRole>,
  ): Promise<ResultPaginate<Role>> {
    return this.repository.paginate(input);
  }
}
