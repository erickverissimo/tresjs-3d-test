import { inject, injectable } from 'inversify';
import { UserRepository } from '../provider';
import { User } from '../model/User';
import { UpdateUserDTO } from '../dto';
import { FindUserByIdService } from './FindUserByIdService';

@injectable()
export class UpdateUserService {
  constructor(
    @inject(UserRepository) private readonly repository: UserRepository,
    @inject(FindUserByIdService)
    private readonly findUserByIdService: FindUserByIdService
  ) {}

  async execute(dto: UpdateUserDTO): Promise<User> {
    const user = await this.findUserByIdService.execute(dto.id);

    user.update(dto);

    await this.repository.update(user);

    return user;
  }
}
