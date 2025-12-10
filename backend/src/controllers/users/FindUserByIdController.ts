import { Response } from 'express';
import { Controller, FindUserByIdUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createUserDetail } from '../../factories/dto/user';
import { inject, injectable } from 'inversify';

@injectable()
export class FindUserByIdController implements Controller {
  constructor(
    @inject(FindUserByIdUseCase)
    readonly useCase: FindUserByIdUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.useCase.execute(req.params.id);
    return res.json(createUserDetail(result));
  }
}
