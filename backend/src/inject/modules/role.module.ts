import { Container } from 'inversify';
import {
  CreateRoleController,
  DeleteRoleController,
  FindAllRolesController,
  FindRoleByIdController,
  UpdateRoleController,
  PaginateRolesController,
} from '../../controllers';
import {
  CreateRoleUseCase,
  DeleteRoleUseCase,
  FindAllRolesUseCase,
  FindRoleByIdUseCase,
  UpdateRoleUseCase,
  PaginateRolesUseCase,
} from '../../core/role/useCase';
import {
  ResolveRolesByNames,
  FindRoleByNameService,
  FindRoleByIdService,
} from '../../core/role/service';
import { RoleRepository } from '../../core/role/provider';
import { RoleMongooseRepository } from '../../repositories';

export function registerRoleModule(container: Container): void {
  // Controllers
  container.bind(CreateRoleController).toSelf();
  container.bind(DeleteRoleController).toSelf();
  container.bind(FindAllRolesController).toSelf();
  container.bind(FindRoleByIdController).toSelf();
  container.bind(UpdateRoleController).toSelf();
  container.bind(PaginateRolesController).toSelf();

  // Use Cases
  container.bind(CreateRoleUseCase).toSelf();
  container.bind(DeleteRoleUseCase).toSelf();
  container.bind(FindAllRolesUseCase).toSelf();
  container.bind(PaginateRolesUseCase).toSelf();
  container.bind(FindRoleByIdUseCase).toSelf();
  container.bind(UpdateRoleUseCase).toSelf();

  // Services
  container.bind(ResolveRolesByNames).toSelf();
  container.bind(FindRoleByNameService).toSelf();
  container.bind(FindRoleByIdService).toSelf();

  // Repository
  container.bind(RoleRepository).to(RoleMongooseRepository);
}
