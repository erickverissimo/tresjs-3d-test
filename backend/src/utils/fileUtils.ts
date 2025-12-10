import { Request } from 'express';
import { randomBytes } from 'crypto';
import mime from 'mime-types';
import { IFileDTO } from '../core/files/dto/FileDTO';
import { createFileDTOFromMulterFile } from '../factories/dto';

export function getFileType(mimeType: string): string {
  if (
    mimeType === 'image/jpeg' ||
    mimeType === 'image/png' ||
    mimeType === 'image/jpg'
  ) {
    return 'image';
  } else if (mimeType === 'video/mp4' || mimeType === 'video/x-m4v') {
    return 'video';
  } else if (
    mimeType === 'application/octet-stream' ||
    mimeType === 'application/pdf' ||
    mimeType === 'text/plain'
  ) {
    return 'document';
  }
  return '';
}

export async function randomFileName(
  originalFileName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let ext = '';
    let fileName = originalFileName;
    const extIndex = originalFileName.lastIndexOf('.');

    if (extIndex >= 0) {
      ext = originalFileName.substring(extIndex, originalFileName.length);
      fileName = originalFileName.substring(0, extIndex);
    }

    randomBytes(16, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${fileName}-${hash.toString('hex')}${ext}`);
      }
    });
  });
}

export function getFileExtension(url: string) {
  const mimeType = mime.lookup(url);
  if (mimeType) {
    return mime.extension(mimeType);
  }
  return '';
}

export function randomFileNameFromUrl(url: string): string {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const extension = getFileExtension(url);
  const formattedUrl = url.replace(/[^a-z0-9]/gi, '_') + '.' + extension;
  const randomName = `${timestamp}_${formattedUrl}`;

  return randomName;
}

export function filesMulterToFileDTO(req: Request): IFileDTO[] {
  const processFiles: IFileDTO[] = [];

  if (req.files) {
    if (Array.isArray(req.files)) {
      req.files.forEach((file) => {
        processFiles.push(createFileDTOFromMulterFile(file));
      });
    } else {
      for (const fieldname in req.files) {
        req.files[fieldname].forEach((file) => {
          processFiles.push(createFileDTOFromMulterFile(file));
        });
      }
    }
  } else if (req.file) {
    processFiles.push(createFileDTOFromMulterFile(req.file));
  }

  return processFiles;
}
