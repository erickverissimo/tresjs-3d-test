import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { FindFileByIdUseCase, Controller, getBaseUrl } from '../../core';

import { createFileUploadResult } from '../../factories/dto';

@injectable()
export class FindFileByIdController implements Controller {
  constructor(
    @inject(FindFileByIdUseCase) readonly useCase: FindFileByIdUseCase,
  ) {}

  async execute(req: Request, res: Response) {
    const baseUrl = getBaseUrl();
    const entity = await this.useCase.execute(req.params.id);
    return res.json(createFileUploadResult(entity, baseUrl));
  }
}
