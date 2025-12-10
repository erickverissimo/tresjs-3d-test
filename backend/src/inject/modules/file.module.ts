import { Container } from 'inversify';
import {
  FindAllFilesController,
  FindFileByIdController,
  DeleteFileController,
  DownloadFileController,
  UploadFromFileDTOController,
  UploadFromUrlController,
} from '../../controllers';
import {
  DownloadFileUseCase,
  FindAllFilesUseCase,
  FindFileByIdUseCase,
  UploadFileUseCase,
  DeleteFileUseCase,
} from '../../core/files/useCase';
import { FileUploadMongooseRepository } from '../../repositories';
import {
  CreateFileContentTypeAndDataService,
  CreateFilePathService,
  FindFileByIdService,
} from '../../core/files/service';
import {
  UploadFromFileDTOFacade,
  UploadFromURLFacade,
} from '../../core/files/facade';
import {
  FileUploadProvider,
  FileUploadRepository,
  resolve as resolveFileUploadProvider,
} from '../../core/files/provider';

export function registerFileModule(container: Container): void {
  // Controllers
  container.bind(FindAllFilesController).toSelf();
  container.bind(FindFileByIdController).toSelf();
  container.bind(DeleteFileController).toSelf();
  container.bind(DownloadFileController).toSelf();
  container.bind(UploadFromFileDTOController).toSelf();
  container.bind(UploadFromUrlController).toSelf();

  // Use Cases
  container.bind(DownloadFileUseCase).toSelf();
  container.bind(FindAllFilesUseCase).toSelf();
  container.bind(FindFileByIdUseCase).toSelf();
  container.bind(UploadFileUseCase).toSelf();
  container.bind(DeleteFileUseCase).toSelf();

  // Services
  container.bind(CreateFileContentTypeAndDataService).toSelf();
  container.bind(CreateFilePathService).toSelf();
  container.bind(FindFileByIdService).toSelf();

  // Facades
  container.bind(UploadFromURLFacade).toSelf();
  container.bind(UploadFromFileDTOFacade).toSelf();

  // Repository
  container.bind(FileUploadRepository).to(FileUploadMongooseRepository);

  container
    .bind(FileUploadProvider)
    .toConstantValue(resolveFileUploadProvider());
}
