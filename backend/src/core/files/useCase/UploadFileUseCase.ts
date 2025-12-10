import { inject, injectable } from 'inversify';
import { AppValidationError } from '../../../errors';
import { IFileUploadDTO, IFileUploadSaveDTO } from '../dto/FileDTO';
import { FileUpload, FileUploadProps } from '../model/FileUpload';
import { FileUploadProvider, FileUploadRepository } from '../provider';
import { Errors, UseCase } from '../../shared';
import { CreateFilePathService } from '../service';

interface UploadFileEntry {
  dto: IFileUploadDTO;
  content: Buffer;
}

@injectable()
export class UploadFileUseCase
  implements UseCase<UploadFileEntry, IFileUploadSaveDTO>
{
  constructor(
    @inject(FileUploadRepository)
    private readonly repository: FileUploadRepository,
    @inject(FileUploadProvider)
    private readonly fileUploadProvider: FileUploadProvider,
    @inject(CreateFilePathService)
    private readonly createFilePathService: CreateFilePathService
  ) {}

  async execute(entry: UploadFileEntry): Promise<IFileUploadSaveDTO> {
    try {
      const path = this.createFilePathService.execute(
        entry.dto.resource,
        entry.dto.resourceId
      );
      console.log(`Novo upload: ${JSON.stringify(entry.dto)}, path: ${path}`);
      const uploadResult = await this.fileUploadProvider.uploadFile({
        name: entry.dto.name,
        path: path,
        body: entry.content,
      });
      if (uploadResult.success) {
        const fileProps: FileUploadProps = {
          name: entry.dto.name,
          resource: entry.dto.resource ?? '',
          resourceId: entry.dto.resourceId ?? '',
          key: uploadResult.path,
          mimeType: entry.dto.mimeType ?? '',
          temporary: entry.dto.temporary ?? true,
        };
        const fileUpload = new FileUpload(fileProps);
        const fileUploadResult = await this.repository.save(fileUpload);

        return {
          id: fileUploadResult.id!,
          name: fileUploadResult.name,
          resource: fileUploadResult.resource,
          resourceId: fileUploadResult.resourceId,
          key: fileUploadResult.key,
          mimeType: fileUploadResult.mimeType,
          temporary: fileUploadResult.temporary,
        };
      } else {
        // console.log(uploadResult);
        throw new AppValidationError(Errors.FILE_UPLOAD_ERROR);
      }
    } catch (e) {
      console.log(e);
      throw new AppValidationError(Errors.FILE_UPLOAD_ERROR);
    }
  }
}
