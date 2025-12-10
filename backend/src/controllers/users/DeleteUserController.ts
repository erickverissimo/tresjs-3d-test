import { Response } from 'express';
import { Controller, DeleteUserUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { inject, injectable } from 'inversify';

@injectable()
export class DeleteUserController implements Controller {
  constructor(@inject(DeleteUserUseCase) readonly useCase: DeleteUserUseCase) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(result);
  }
}
