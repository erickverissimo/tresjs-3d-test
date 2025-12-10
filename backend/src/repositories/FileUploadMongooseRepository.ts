import { injectable } from 'inversify';
import { FileUpload, FileUploadRepository } from '../core';
import { FileUploadMongoose, IFileUpload } from '../externals/db/mongoose';
import { FileUploadConverter } from './converters';

@injectable()
export class FileUploadMongooseRepository implements FileUploadRepository {
  async findAll(): Promise<FileUpload[]> {
    const files = await FileUploadMongoose.find();
    return files.map((file: IFileUpload) => FileUploadConverter.fromDb(file));
  }

  async findById(id: string): Promise<FileUpload | null> {
    const fileUploadMongoose = await FileUploadMongoose.findById(id);
    if (!fileUploadMongoose) {
      return null;
    }
    return FileUploadConverter.fromDb(fileUploadMongoose);
  }

  async delete(id: string): Promise<void> {
    await FileUploadMongoose.deleteById(id);
  }

  async update(file: FileUpload): Promise<void> {
    await FileUploadMongoose.findByIdAndUpdate(
      file.id,
      FileUploadConverter.toDb(file)
    );
  }

  async save(file: FileUpload): Promise<FileUpload> {
    const result = await FileUploadMongoose.create(
      FileUploadConverter.toDb(file)
    );
    return FileUploadConverter.fromDb(result);
  }
}
