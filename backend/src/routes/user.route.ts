import { Router } from 'express';

import { container } from '../inversify.config';
import { adaptRoute } from '../adapters/express-router-adapter';
import { AuthPermissions } from '../core/auth';
import { AppRouter } from './AppRouter';
import { auth, hasPermission } from '../middlewares';

import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  FindUserByIdController,
  PaginateUsersController,
  UpdateUserController,
} from '../controllers/users';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', auth, adaptRoute(container.get(FindAllUsersController)));

  router.get(
    '/paginate',
    auth,
    adaptRoute(container.get(PaginateUsersController))
  );

  router.get(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.user.view),
    adaptRoute(container.get(FindUserByIdController))
  );

  router.post(
    '/',
    auth,
    hasPermission(AuthPermissions.permissions.user.create),
    adaptRoute(container.get(CreateUserController))
  );

  router.put(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.user.update),
    adaptRoute(container.get(UpdateUserController))
  );

  router.delete(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.user.delete),
    adaptRoute(container.get(DeleteUserController))
  );

  return {
    path: '/users',
    router,
  };
}
