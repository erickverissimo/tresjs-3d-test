import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { FindAllFilesUseCase, Controller } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createFileUploadList } from '../../factories/dto';

@injectable()
export class FindAllFilesController implements Controller {
  constructor(
    @inject(FindAllFilesUseCase) readonly useCase: FindAllFilesUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const files = await this.useCase.execute();
    return res.json(files.map((file) => createFileUploadList(file)));
  }
}
