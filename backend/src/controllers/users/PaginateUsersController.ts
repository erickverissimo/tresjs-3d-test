import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, FilterPaginate, PaginateUsersUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createUserList } from '../../factories/dto/user';
import { PaginateUserSchemaValidator } from '../../externals/validators';

@injectable()
export class PaginateUsersController implements Controller {
  constructor(
    @inject(PaginateUsersUseCase)
    readonly useCase: PaginateUsersUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const { page, limit, ...filter } = PaginateUserSchemaValidator.parse(
      req.query
    );
    const result = await this.useCase.execute(
      new FilterPaginate(filter, page, limit)
    );
    return res.json(result.map(createUserList));
  }
}
