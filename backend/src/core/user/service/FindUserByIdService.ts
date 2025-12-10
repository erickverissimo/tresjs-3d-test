import { inject, injectable } from 'inversify';
import { UserRepository } from '../provider';
import { AppValidationError } from '../../../errors';
import { Errors } from '../../shared';
import { User } from '../model/User';

@injectable()
export class FindUserByIdService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppValidationError(Errors.USER_NOT_FOUND);
    }
    return user;
  }
}
