import { inject, injectable } from 'inversify';
import { Response } from 'express';
import {
  Controller,
  FilterPaginate,
  PaginatePermissionsUseCase,
} from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createPermissionList } from '../../factories/dto/permission';
import { PaginatePermissionSchemaValidator } from '../../externals/validators';

@injectable()
export class PaginatePermissionsController implements Controller {
  constructor(
    @inject(PaginatePermissionsUseCase)
    readonly useCase: PaginatePermissionsUseCase,
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const { page, limit, ...filter } = PaginatePermissionSchemaValidator.parse(
      req.query,
    );
    const result = await this.useCase.execute(
      new FilterPaginate(filter, page, limit),
    );
    return res.json(result.map(createPermissionList));
  }
}
