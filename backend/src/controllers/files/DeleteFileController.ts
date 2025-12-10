import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { DeleteFileUseCase, Controller } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

@injectable()
export class DeleteFileController implements Controller {
  constructor(@inject(DeleteFileUseCase) readonly useCase: DeleteFileUseCase) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(result);
  }
}
