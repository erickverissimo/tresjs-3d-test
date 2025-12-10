import { Response } from 'express';
import { Controller, FindRoleByIdUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createRoleDetail } from '../../factories/dto/role';
import { inject, injectable } from 'inversify';

@injectable()
export class FindRoleByIdController implements Controller {
  constructor(
    @inject(FindRoleByIdUseCase) readonly useCase: FindRoleByIdUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(createRoleDetail(result));
  }
}
