import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import {
  FileUploadProvider,
  FileUploadResult,
  IFileUploadData,
} from '../../core';
import { Environment } from '../../config/environment';

export class S3Provider implements FileUploadProvider {
  private s3client: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.region = Environment.getAwsRegion();
    this.bucket = Environment.getAwsS3Bucket();
    this.s3client = new S3Client({ region: this.region });
  }

  async download(key: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    const response = await this.s3client.send(command);
    if (!response.Body) {
      throw new Error('File not found');
    }
    return response.Body as Readable;
  }

  async uploadFile(file: IFileUploadData): Promise<FileUploadResult> {
    try {
      const params = {
        Bucket: this.bucket,
        Key: `${file.path}/${file.name}`,
        Body: file.body,
      };

      await this.s3client.send(new PutObjectCommand(params));

      return {
        success: true,
        path: params.Key,
      };
    } catch (e) {
      return {
        success: false,
        error: e.toString(),
      };
    }
  }
}

export default () => new S3Provider();
