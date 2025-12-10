import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, FindAllRolesUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createRoleList } from '../../factories/dto/role';
import { FindAllRolesSchemaValidator } from '../../externals/validators';

@injectable()
export class FindAllRolesController implements Controller {
  constructor(
    @inject(FindAllRolesUseCase) readonly useCase: FindAllRolesUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const filter = FindAllRolesSchemaValidator.parse(req.query);
    const result = await this.useCase.execute(filter);
    return res.json(result.map(createRoleList));
  }
}
