import { inject, injectable } from 'inversify';
import { User } from '../model/User';
import { FindUserByIdService } from '../service/FindUserByIdService';
import { UseCase } from '../../shared';

@injectable()
export class FindUserByIdUseCase implements UseCase<string, User> {
  constructor(
    @inject(FindUserByIdService)
    private readonly findUserByIdService: FindUserByIdService
  ) {}

  async execute(id: string): Promise<User> {
    return this.findUserByIdService.execute(id);
  }
}
