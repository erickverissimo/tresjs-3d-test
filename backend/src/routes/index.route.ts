import { Router } from 'express';
import { AppRouter } from './AppRouter';
import { rawBody } from '../middlewares';
import multer from 'multer';
import { multerConfig } from '../config/multer';

const upload = multer(multerConfig);

export function createRoute(): AppRouter {
  const router = Router();

  router.all('/teste', rawBody, upload.any(), (req: any, res) => {
    console.log('###################');
    const { headers, params, body, rawBody, files } = req;
    console.log(
      JSON.stringify({ headers, params, body, rawBody, files }, null, 2)
    );
    console.log('###################');

    return res.json({ headers, params, body, rawBody, files });
  });

  return {
    path: '/',
    router,
  };
}
