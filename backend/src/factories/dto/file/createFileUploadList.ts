import { IFileUploadListDTO } from '../../../core/files/dto/FileDTO';
import { FileUpload } from '../../../core';

export function createFileUploadList(
  fileUpload: FileUpload
): IFileUploadListDTO {
  const dto: IFileUploadListDTO = {
    id: fileUpload.id ?? '',
    resource: fileUpload.resource,
    resourceId: fileUpload.resourceId,
    name: fileUpload.name,
    key: fileUpload.key,
    mimeType: fileUpload.mimeType,
    temporary: fileUpload.temporary,
    createdAt: fileUpload.createdAt,
  };

  return dto;
}
