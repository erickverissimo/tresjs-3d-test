import { Router } from 'express';

import { AppRouter } from './AppRouter';

import { adaptRoute } from '../adapters/express-router-adapter';
import { container } from '../inversify.config';
import { LoginController } from '../controllers/auth';

export function createRoute(): AppRouter {
  const router = Router();

  router.post('/login', adaptRoute(container.get(LoginController)));

  return {
    path: '/auth',
    router,
  };
}
