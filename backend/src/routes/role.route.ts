import { Router } from 'express';
import { container } from '../inversify.config';
import { AuthPermissions } from '../core';

import { AppRouter } from './AppRouter';
import { auth, hasPermission } from '../middlewares';

import { adaptRoute } from '../adapters/express-router-adapter';
import {
  CreateRoleController,
  DeleteRoleController,
  FindAllRolesController,
  FindRoleByIdController,
  PaginateRolesController,
  UpdateRoleController,
} from '../controllers/role';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', auth, adaptRoute(container.get(FindAllRolesController)));

  router.get(
    '/paginate',
    auth,
    adaptRoute(container.get(PaginateRolesController))
  );

  router.get(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.role.view),
    adaptRoute(container.get(FindRoleByIdController))
  );

  router.post(
    '/',
    auth,
    hasPermission(AuthPermissions.permissions.role.create),
    adaptRoute(container.get(CreateRoleController))
  );

  router.put(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.role.update),
    adaptRoute(container.get(UpdateRoleController))
  );

  router.delete(
    '/:id',
    auth,
    hasPermission(AuthPermissions.permissions.role.delete),
    adaptRoute(container.get(DeleteRoleController))
  );

  return {
    path: '/roles',
    router,
  };
}
