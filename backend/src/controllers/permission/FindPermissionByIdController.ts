import { Response } from 'express';
import { Controller, FindPermissionByIdUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createPermissionDetail } from '../../factories/dto/permission';
import { inject, injectable } from 'inversify';

@injectable()
export class FindPermissionByIdController implements Controller {
  constructor(
    @inject(FindPermissionByIdUseCase)
    readonly useCase: FindPermissionByIdUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(createPermissionDetail(result));
  }
}
