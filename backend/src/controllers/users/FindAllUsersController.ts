import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, FindAllUsersUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createUserList } from '../../factories/dto/user';
import { FindAllUsersSchemaValidator } from '../../externals/validators';

@injectable()
export class FindAllUsersController implements Controller {
  constructor(
    @inject(FindAllUsersUseCase)
    readonly useCase: FindAllUsersUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const filter = FindAllUsersSchemaValidator.parse(req.query);
    const result = await this.useCase.execute(filter);
    return res.json(result.map(createUserList));
  }
}
