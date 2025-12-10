export interface IFileDTO {
  /** Name of the form field associated with this file. */
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;

  /** Value of the `Content-Type` header for this file. */
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;

  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer;
}

export interface IFileUploadDTO {
  name: string;
  resource?: string;
  resourceId?: string;
  mimeType?: string;
  temporary?: boolean;
}
export interface IFileUploadSaveDTO {
  id?: string;
  name: string;
  resource?: string;
  key?: string;
  resourceId?: string;
  mimeType?: string;
  temporary?: boolean;
}

export interface IFileUploadResultDTO {
  id: string;
  name: string;
  key: string;
  resource?: string;
  resourceId?: string;
  mimeType: string;
  url: string;
  temporary: boolean;
  createdAt: Date;
}

export interface IFileUploadListDTO {
  id: string;
  name: string;
  key: string;
  resource: string;
  resourceId: string;
  mimeType: string;
  temporary: boolean;
  createdAt: Date;
}
