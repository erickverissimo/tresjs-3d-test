import { inject, injectable } from 'inversify';
import { readFile, unlink } from 'fs/promises';
import { UploadFileUseCase } from '../useCase/UploadFileUseCase';
import { IFileUploadDTO, IFileDTO, IFileUploadSaveDTO } from '../dto/FileDTO';

export interface UploadFromFileDTOInput {
  dto: IFileUploadDTO;
  file: IFileDTO;
}

@injectable()
export class UploadFromFileDTOFacade {
  constructor(
    @inject(UploadFileUseCase) private readonly uploadFile: UploadFileUseCase,
  ) {}

  async execute(input: UploadFromFileDTOInput): Promise<IFileUploadSaveDTO> {
    const buffer = await readFile(input.file.path);
    const upload = await this.uploadFile.execute({
      dto: {
        ...input.dto,
        mimeType: input.file.mimetype,
      },
      content: buffer,
    });

    unlink(input.file.path);

    return upload;
  }
}
