import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { FindUserByIdUseCase } from '../../core';
import { AuthenticatedRequest } from '../../middlewares/auth';
import { Controller } from '../../core/shared';
import { createUserDetail } from '../../factories/dto/user';

@injectable()
export class GetMeController implements Controller {
  constructor(
    @inject(FindUserByIdUseCase) readonly useCase: FindUserByIdUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const user = await this.useCase.execute(req.userId);
    return res.json(createUserDetail(user));
  }
}
