import { PermissionRepository } from '../provider/PermissionRepository';
import { UseCase } from '../../shared/UseCase';
import { injectable, inject } from 'inversify';
import { FindPermissionByIdService } from '../service';

@injectable()
export class DeletePermissionUseCase implements UseCase<string, void> {
  constructor(
    @inject(PermissionRepository)
    private readonly repository: PermissionRepository,
    @inject(FindPermissionByIdService)
    private readonly findPermissionByIdService: FindPermissionByIdService
  ) {}

  async execute(id: string): Promise<void> {
    const permission = await this.findPermissionByIdService.execute(id);
    await this.repository.delete(id);
  }
}
