import { inject, injectable } from 'inversify';
import { UserRepository } from '../provider';
import { AppValidationError } from '../../../errors';
import { Errors } from '../../shared';

@injectable()
export class UserEmailValidatorService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  async validate(email: string, id?: string): Promise<void> {
    const emailAlreadyExists = await this.userRepository.existsWithEmail(
      email,
      id
    );

    if (emailAlreadyExists) {
      throw new AppValidationError(Errors.USER_EMAIL_ALREADY_EXISTS);
    }
  }
}
