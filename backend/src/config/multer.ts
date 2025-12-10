import multer from 'multer';
import { randomFileName } from '../utils';
import { Errors } from '../core';
import { Environment } from './environment';

export const multerConfig: multer.Options = {
  storage: multer.diskStorage({
    destination: Environment.getTempUploadPath(),
    filename: (_, file, cb) => {
      randomFileName(file.originalname).then((newFileName) =>
        cb(null, newFileName)
      );
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'text/csv',
      'application/pdf',
      'text/plain',
      'video/mp4',
      'video/x-m4v',
      'application/octet-stream',
      'application/xml', // Adicionando suporte para XML
      'text/xml', // Adicionando suporte para XML
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(Errors.INVALID_FILE));
    }
  },
};
