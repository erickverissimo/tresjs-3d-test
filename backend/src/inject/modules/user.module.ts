import { Container } from 'inversify';
import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  FindUserByIdController,
  UpdateUserController,
  PaginateUsersController,
} from '../../controllers';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUsersUseCase,
  PaginateUsersUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from '../../core/user/useCase';
import { UserMongooseRepository } from '../../repositories';
import {
  FindUserByIdService,
  UpdateUserService,
  UserEmailValidatorService,
} from '../../core/user/service';
import { UserRepository } from '../../core/user/provider';

export function registerUserModule(container: Container): void {
  container.bind(CreateUserController).toSelf();
  container.bind(DeleteUserController).toSelf();
  container.bind(FindAllUsersController).toSelf();
  container.bind(FindUserByIdController).toSelf();
  container.bind(UpdateUserController).toSelf();
  container.bind(PaginateUsersController).toSelf();

  container.bind(CreateUserUseCase).toSelf();
  container.bind(DeleteUserUseCase).toSelf();
  container.bind(FindAllUsersUseCase).toSelf();
  container.bind(PaginateUsersUseCase).toSelf();
  container.bind(FindUserByIdUseCase).toSelf();
  container.bind(UpdateUserUseCase).toSelf();

  container.bind(UserEmailValidatorService).toSelf();
  container.bind(FindUserByIdService).toSelf();
  container.bind(UpdateUserService).toSelf();

  container.bind(UserRepository).to(UserMongooseRepository);
}
