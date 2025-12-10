import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared';
import { FileUpload } from '../model/FileUpload';
import { FileUploadRepository } from '../provider/FileUploadRepository';

@injectable()
export class FindAllFilesUseCase implements UseCase<void, FileUpload[]> {
  constructor(
    @inject(FileUploadRepository)
    private readonly repository: FileUploadRepository,
  ) {}

  async execute(): Promise<FileUpload[]> {
    return this.repository.findAll();
  }
}
