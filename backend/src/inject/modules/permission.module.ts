import { Container } from 'inversify';
import {
  CreatePermissionController,
  DeletePermissionController,
  FindAllPermissionsController,
  FindPermissionByIdController,
  UpdatePermissionController,
  PaginatePermissionsController,
} from '../../controllers';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  FindAllPermissionsUseCase,
  FindPermissionByIdUseCase,
  UpdatePermissionUseCase,
  PaginatePermissionsUseCase,
} from '../../core/permission/useCase';
import { FindPermissionByIdService } from '../../core/permission/service';
import { PermissionRepository } from '../../core/permission/provider';
import { PermissionMongooseRepository } from '../../repositories';

export function registerPermissionModule(container: Container): void {
  // Controllers
  container.bind(CreatePermissionController).toSelf();
  container.bind(DeletePermissionController).toSelf();
  container.bind(FindAllPermissionsController).toSelf();
  container.bind(FindPermissionByIdController).toSelf();
  container.bind(UpdatePermissionController).toSelf();
  container.bind(PaginatePermissionsController).toSelf();

  // Use Cases
  container.bind(CreatePermissionUseCase).toSelf();
  container.bind(DeletePermissionUseCase).toSelf();
  container.bind(FindAllPermissionsUseCase).toSelf();
  container.bind(PaginatePermissionsUseCase).toSelf();
  container.bind(FindPermissionByIdUseCase).toSelf();
  container.bind(UpdatePermissionUseCase).toSelf();

  // Services
  container.bind(FindPermissionByIdService).toSelf();

  // Repository
  container.bind(PermissionRepository).to(PermissionMongooseRepository);
}
