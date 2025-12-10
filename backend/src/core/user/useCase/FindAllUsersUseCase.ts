import { UserRepository } from '../provider/UserRepository';
import { UseCase } from '../../shared/UseCase';
import { User } from '../model/User';
import { FilterUser } from '../filter';
import { inject, injectable } from 'inversify';

@injectable()
export class FindAllUsersUseCase
  implements UseCase<FilterUser | undefined, User[]>
{
  constructor(
    @inject(UserRepository)
    private readonly repository: UserRepository
  ) {}

  execute(filter?: FilterUser): Promise<User[]> {
    return this.repository.findAll(filter);
  }
}
