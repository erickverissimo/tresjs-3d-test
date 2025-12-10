import { Router } from 'express';

import { AppRouter } from './AppRouter';

import { adaptRoute } from '../adapters/express-router-adapter';

import { container } from '../inversify.config';
import { DownloadFileController } from '../controllers';

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/:id', adaptRoute(container.get(DownloadFileController)));

  return {
    path: '/download',
    router,
  };
}
