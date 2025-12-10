import { Readable } from 'stream';
import { Environment } from '../../../config/environment';

import createFileUploadLocalProvider from '../../../provider/upload/FileUploadLocalProvider';
import createS3Provider from '../../../provider/upload/S3Provider';

const providers = {
  FileUploadLocalProvider: createFileUploadLocalProvider,
  S3Provider: createS3Provider,
};

export abstract class FileUploadProvider {
  abstract uploadFile(file: IFileUploadData): Promise<FileUploadResult>;
  abstract download(key: string): Promise<Readable>;
}

export interface FileUploadResult {
  success: boolean;
  error?: any;
  path?: any;
}

export interface IFileUploadData {
  path: string;
  name: string;
  body: Buffer;
}

export function resolve(): FileUploadProvider {
  const providerName = Environment.getFileUploadProvider();
  console.log(`Resolvendo file upload provider: ${providerName}`);
  return providers[providerName]();
}
