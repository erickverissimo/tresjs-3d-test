import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth';
import { Controller, UploadFromFileDTOFacade } from '../../core';
import { filesMulterToFileDTO } from '../../utils';

@injectable()
export class UploadFromFileDTOController implements Controller {
  constructor(
    @inject(UploadFromFileDTOFacade)
    readonly facade: UploadFromFileDTOFacade
  ) {}

  async execute(req: AuthenticatedRequest, res: Response): Promise<any> {
    const [file] = filesMulterToFileDTO(req);
    const result = await this.facade.execute({
      dto: {
        name: file.filename,
        temporary: true,
      },
      file: file,
    });
    return res.json(result);
  }
}
