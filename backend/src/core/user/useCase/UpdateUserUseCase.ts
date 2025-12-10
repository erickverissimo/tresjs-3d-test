import { UseCase } from '../../shared';
import { User } from '../model/User';
import { UpdateUserDTO } from '../dto';
import { injectable, inject } from 'inversify';
import { UpdateUserService } from '../service';

@injectable()
export class UpdateUserUseCase implements UseCase<UpdateUserDTO, User> {
  constructor(
    @inject(UpdateUserService)
    private readonly updateUserService: UpdateUserService
  ) {}

  async execute(dto: UpdateUserDTO): Promise<User> {
    const user = await this.updateUserService.execute(dto);

    return user;
  }
}
