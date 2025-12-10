import { injectable } from 'inversify';
import { FileUpload } from '../model/FileUpload';

@injectable()
export abstract class FileUploadRepository {
  abstract findAll(): Promise<FileUpload[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(file: FileUpload): Promise<void>;
  abstract findById(id: string): Promise<FileUpload | null>;
  abstract save(file: FileUpload): Promise<FileUpload>;
}
