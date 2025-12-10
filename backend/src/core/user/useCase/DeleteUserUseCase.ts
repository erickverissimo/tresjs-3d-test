import { UserRepository } from '../provider/UserRepository';
import { UseCase } from '../../shared/UseCase';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors } from '../../shared';
import { injectable, inject } from 'inversify';

@injectable()
export class DeleteUserUseCase implements UseCase<string, void> {
  constructor(
    @inject(UserRepository)
    private readonly repository: UserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppObjectNotFoundError(Errors.USER_NOT_FOUND);
    }

    await this.repository.delete(id);
  }
}
