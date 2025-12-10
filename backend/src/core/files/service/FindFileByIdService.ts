import { inject, injectable } from 'inversify';
import { FileUploadRepository } from '../provider';
import { FileUpload } from '../model/FileUpload';
import { Errors } from '../../shared';
import { AppObjectNotFoundError } from '../../../errors';

@injectable()
export class FindFileByIdService {
  constructor(
    @inject(FileUploadRepository)
    private readonly repository: FileUploadRepository,
  ) {}

  async execute(id: string): Promise<FileUpload> {
    const file = await this.repository.findById(id);
    if (!file) {
      throw new AppObjectNotFoundError(Errors.FILE_UPLOAD_NOT_FOUND);
    }
    return file;
  }
}
