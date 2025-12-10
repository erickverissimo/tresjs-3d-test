import multer from 'multer';
import { Router } from 'express';

import { AppRouter } from './AppRouter';

import { adaptRoute } from '../adapters/express-router-adapter';

import { multerConfig } from '../config/multer';
import { auth } from '../middlewares/auth';
import { container } from '../inversify.config';
import {
  FindAllFilesController,
  FindFileByIdController,
  UploadFromFileDTOController,
  UploadFromUrlController,
} from '../controllers';

const upload = multer(multerConfig);

export function createRoute(): AppRouter {
  const router = Router();

  router.get('/', auth, adaptRoute(container.get(FindAllFilesController)));
  router.get('/:id', auth, adaptRoute(container.get(FindFileByIdController)));
  router.post(
    '/',
    upload.single('arquivo'),
    adaptRoute(container.get(UploadFromFileDTOController))
  );

  router.post(
    '/upload_by_url',
    adaptRoute(container.get(UploadFromUrlController))
  );

  return {
    path: '/uploads',
    router,
  };
}
