import { Response } from 'express';
import { Controller, DeletePermissionUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { inject, injectable } from 'inversify';

@injectable()
export class DeletePermissionController implements Controller {
  constructor(
    @inject(DeletePermissionUseCase) readonly useCase: DeletePermissionUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(result);
  }
}
