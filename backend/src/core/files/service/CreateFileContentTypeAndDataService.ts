import { inject, injectable } from 'inversify';
import { HttpRequest } from '../../shared';

@injectable()
export class CreateFileContentTypeAndDataService {
  constructor(@inject(HttpRequest) private readonly httpRequest: HttpRequest) {}

  async execute(
    fileUrl: string,
  ): Promise<{ contentType: string; fileData: Buffer }> {
    const response = await this.httpRequest.get<string>(fileUrl, {
      responseType: 'arraybuffer',
    });
    const responseType = await this.httpRequest.head(fileUrl);
    const contentType = responseType.headers['content-type'];
    const fileData = Buffer.from(response.data, 'binary');

    return { contentType, fileData };
  }
}
