import { UserRepository } from '../provider/UserRepository';
import { UseCase } from '../../shared/UseCase';
import { User } from '../model/User';
import { FilterUser } from '../filter';
import { inject, injectable } from 'inversify';
import { FilterPaginate, ResultPaginate } from '../../shared';

@injectable()
export class PaginateUsersUseCase
  implements UseCase<FilterPaginate<FilterUser>, ResultPaginate<User>>
{
  constructor(
    @inject(UserRepository)
    private readonly repository: UserRepository
  ) {}

  execute(input: FilterPaginate<FilterUser>): Promise<ResultPaginate<User>> {
    return this.repository.paginate(input);
  }
}
