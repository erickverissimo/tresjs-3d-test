import { FileUpload } from '../../core/files/model/FileUpload';
import { IFileUpload } from '../../externals/db/mongoose/models/FileUploadMongoose';

export class FileUploadConverter {
  static fromDb(fileUpload: IFileUpload): FileUpload {
    return new FileUpload({
      id: fileUpload._id?.toString(),
      name: fileUpload.name,
      key: fileUpload.key,
      mimeType: fileUpload.mimeType,
      resource: fileUpload.resource,
      resourceId: fileUpload.resourceId,
      temporary: fileUpload.temporary,
      createdAt: fileUpload.createdAt,
      updatedAt: fileUpload.updatedAt,
      isDeleted: fileUpload.isDeleted,
      deletedAt: fileUpload.deletedAt,
    });
  }

  static toDb(fileUpload: FileUpload): Partial<IFileUpload> {
    return {
      _id: fileUpload.id?.toString() as any,
      name: fileUpload.name,
      key: fileUpload.key,
      mimeType: fileUpload.mimeType,
      resource: fileUpload.resource,
      resourceId: fileUpload.resourceId,
      temporary: fileUpload.temporary,
      createdAt: fileUpload.createdAt,
      updatedAt: fileUpload.updatedAt,
      isDeleted: fileUpload.isDeleted,
      deletedAt: fileUpload.deletedAt,
    };
  }
}
