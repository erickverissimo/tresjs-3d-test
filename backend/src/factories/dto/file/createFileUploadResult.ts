import { IFileUploadResultDTO } from '../../../core/files/dto/FileDTO';
import { FileUpload } from '../../../core';

export function createFileUploadResult(
  fileUpload: FileUpload,
  baseUrl: string
): IFileUploadResultDTO {
  const dto: IFileUploadResultDTO = {
    id: fileUpload.id ?? '',
    name: fileUpload.name,
    resource: fileUpload.resource,
    resourceId: fileUpload.resourceId,
    key: fileUpload.key,
    mimeType: fileUpload.mimeType,
    temporary: fileUpload.temporary,
    url: `${baseUrl}/api/download/${fileUpload.id}`,
    createdAt: fileUpload.createdAt,
  };
  return dto;
}
