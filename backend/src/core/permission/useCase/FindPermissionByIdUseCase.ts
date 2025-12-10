import { UseCase } from '../../shared/UseCase';
import { Permission } from '../model/Permission';
import { injectable, inject } from 'inversify';
import { FindPermissionByIdService } from '../service';

@injectable()
export class FindPermissionByIdUseCase implements UseCase<string, Permission> {
  constructor(
    @inject(FindPermissionByIdService)
    private readonly findPermissionByIdService: FindPermissionByIdService,
  ) {}

  async execute(id: string): Promise<Permission> {
    const permission = await this.findPermissionByIdService.execute(id);
    return permission;
  }
}
