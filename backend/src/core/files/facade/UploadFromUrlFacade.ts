import { inject, injectable } from 'inversify';
import { MimeTypeResolver, ID } from '../../shared';
import { UploadFileUseCase } from '../useCase/UploadFileUseCase';
import { CreateFileContentTypeAndDataService } from '../service';

@injectable()
export class UploadFromURLFacade {
  constructor(
    @inject(CreateFileContentTypeAndDataService)
    private readonly createFileContentTypeAndDataService: CreateFileContentTypeAndDataService,
    @inject(UploadFileUseCase) private readonly uploadFile: UploadFileUseCase,
    @inject(MimeTypeResolver)
    private readonly mimeTypeResolver: MimeTypeResolver,
  ) {}

  async execute(fileUrl: string): Promise<any> {
    const { contentType, fileData } =
      await this.createFileContentTypeAndDataService.execute(fileUrl);

    const upload = await this.uploadFile.execute({
      dto: {
        name: `${new ID().value}.${this.mimeTypeResolver.extension(
          contentType,
        )}`,
        temporary: true,
        mimeType: contentType,
      },
      content: fileData,
    });

    return upload;
  }
}
