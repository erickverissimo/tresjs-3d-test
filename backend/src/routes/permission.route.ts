import { Router } from 'express';
import { container } from '../inversify.config';

import { AppRouter } from './AppRouter';
import { auth, hasRole } from '../middlewares/auth';

import { adaptRoute } from '../adapters/express-router-adapter';
import {
  CreatePermissionController,
  DeletePermissionController,
  FindAllPermissionsController,
  FindPermissionByIdController,
  PaginatePermissionsController,
  UpdatePermissionController,
} from '../controllers/permission';
import { Roles } from '../core';

export function createRoute(): AppRouter {
  const router = Router();

  router.get(
    '/',
    auth,
    adaptRoute(container.get(FindAllPermissionsController))
  );

  router.get(
    '/paginate',
    auth,
    adaptRoute(container.get(PaginatePermissionsController))
  );

  router.get(
    '/:id',
    auth,
    hasRole(Roles.ADMIN),
    adaptRoute(container.get(FindPermissionByIdController))
  );

  router.post(
    '/',
    auth,
    hasRole(Roles.ADMIN),
    adaptRoute(container.get(CreatePermissionController))
  );

  router.put(
    '/:id',
    auth,
    hasRole(Roles.ADMIN),
    adaptRoute(container.get(UpdatePermissionController))
  );

  router.delete(
    '/:id',
    auth,
    hasRole(Roles.ADMIN),
    adaptRoute(container.get(DeletePermissionController))
  );

  return {
    path: '/permissions',
    router,
  };
}
