import { IFileDTO } from '../../../core/files/dto/FileDTO';

export function createFileDTOFromMulterFile(
  file: Express.Multer.File,
): IFileDTO {
  return {
    buffer: file.buffer,
    destination: file.destination,
    fieldname: file.fieldname,
    filename: file.filename,
    mimetype: file.mimetype,
    originalname: file.originalname,
    path: file.path,
    size: file.size,
  };
}
