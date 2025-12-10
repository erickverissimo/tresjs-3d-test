import { inject, injectable } from 'inversify';
import { Readable } from 'stream';
import { FileUploadProvider } from '../provider/FileUploadProvider';
import { FileUploadRepository } from '../provider/FileUploadRepository';
import { Errors, UseCase } from '../../shared';

export interface IFileDownload {
  name: string;
  contentType: string;
  content: Readable;
}

@injectable()
export class DownloadFileUseCase implements UseCase<string, IFileDownload> {
  constructor(
    @inject(FileUploadRepository)
    private readonly repository: FileUploadRepository,
    @inject(FileUploadProvider)
    private readonly fileUploadProvider: FileUploadProvider,
  ) {}

  async execute(id: string): Promise<IFileDownload> {
    const result = await this.repository.findById(id);
    if (!result?.key) {
      throw new Error(Errors.FILE_UPLOAD_NOT_FOUND);
    }
    const file: IFileDownload = {
      name: result.name,
      contentType: result.mimeType,
      content: await this.fileUploadProvider.download(result.key),
    };
    return file;
  }
}
