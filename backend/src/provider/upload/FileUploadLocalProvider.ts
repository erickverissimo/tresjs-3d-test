import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import {
  FileUploadProvider,
  FileUploadResult,
  IFileUploadData,
} from '../../core';
import logger from '../../logger';
import { Environment } from '../../config/environment';

export class FileUploadLocalProvider implements FileUploadProvider {
  async download(key: string): Promise<Readable> {
    const source = path.resolve(Environment.getUploadPath(), key);

    if (!fs.existsSync(source)) {
      throw new Error('File not found');
    }
    return fs.createReadStream(source);
  }

  uploadFile(file: IFileUploadData): Promise<FileUploadResult> {
    // logger.info(`Salvando arquivo local: ${JSON.stringify(file)}`);
    return new Promise((resolve, reject) => {
      const filePath = path.join(file.path, file.name);
      const targetName = path.resolve(Environment.getUploadPath(), file.path);
      const target = path.join(targetName, file.name);

      logger.info(`File path: ${filePath}, target: ${target}`);
      if (!fs.existsSync(targetName)) {
        fs.mkdirSync(targetName, { recursive: true });
      }
      try {
        fs.writeFileSync(target, file.body);
        resolve({
          success: true,
          path: filePath,
        });
      } catch (error) {
        reject({
          success: false,
          error: error,
        });
      }

      //}
    });
  }
}

export default () => new FileUploadLocalProvider();
