import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, FilterPaginate, PaginateRolesUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createRoleList } from '../../factories/dto/role';
import { PaginateRoleSchemaValidator } from '../../externals/validators';

@injectable()
export class PaginateRolesController implements Controller {
  constructor(
    @inject(PaginateRolesUseCase) readonly useCase: PaginateRolesUseCase,
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const { page, limit, ...filter } = PaginateRoleSchemaValidator.parse(
      req.query,
    );
    const result = await this.useCase.execute(
      new FilterPaginate(filter, page, limit),
    );
    return res.json(result.map(createRoleList));
  }
}
