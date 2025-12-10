import { UseCase } from '../../shared';
import { Role } from '../model';
import { injectable, inject } from 'inversify';
import { FindRoleByIdService } from '../service';

@injectable()
export class FindRoleByIdUseCase implements UseCase<string, Role> {
  constructor(
    @inject(FindRoleByIdService)
    private readonly findRoleByIdService: FindRoleByIdService,
  ) {}

  async execute(id: string): Promise<Role> {
    const role = await this.findRoleByIdService.execute(id);
    return role;
  }
}
