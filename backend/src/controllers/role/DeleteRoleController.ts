import { Response } from 'express';
import { Controller, DeleteRoleUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { inject, injectable } from 'inversify';

@injectable()
export class DeleteRoleController implements Controller {
  constructor(@inject(DeleteRoleUseCase) readonly useCase: DeleteRoleUseCase) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(result);
  }
}
