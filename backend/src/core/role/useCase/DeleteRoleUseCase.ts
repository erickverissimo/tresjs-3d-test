import { RoleRepository } from '../provider';
import { UseCase } from '../../shared';
import { injectable, inject } from 'inversify';
import { FindRoleByIdService } from '../service';

@injectable()
export class DeleteRoleUseCase implements UseCase<string, void> {
  constructor(
    @inject(RoleRepository)
    private readonly repository: RoleRepository,
    @inject(FindRoleByIdService)
    private readonly findRoleByIdService: FindRoleByIdService,
  ) {}

  async execute(id: string): Promise<void> {
    const role = await this.findRoleByIdService.execute(id);
    await this.repository.delete(id);
  }
}
