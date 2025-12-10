import { inject, injectable } from 'inversify';
import { Controller, DownloadFileUseCase, IFileDownload } from '../../core';
import { Response, Request } from 'express';
import logger from '../../logger';
import { Readable } from 'winston-transport';

@injectable()
export class DownloadFileController implements Controller {
  constructor(
    @inject(DownloadFileUseCase) private readonly useCase: DownloadFileUseCase
  ) {}

  async execute(req: Request, res: Response): Promise<any> {
    const file: IFileDownload = await this.useCase.execute(req.params.id);
    res.type('application/octet-stream');
    res.attachment(file.name);
    return this._download(file.content, res);
  }

  private _download(stream: Readable, res: Response) {
    stream
      .on('data', (chunk) => {
        res.write(chunk);
      })
      .on('error', (err_msg) => {
        logger.info(err_msg);
        res.end(err_msg);
      })
      .on('end', () => {
        res.end();
      });
  }
}
