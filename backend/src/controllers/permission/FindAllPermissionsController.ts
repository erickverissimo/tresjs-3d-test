import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, FindAllPermissionsUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createPermissionList } from '../../factories/dto/permission';
import { FindAllPermissionsSchemaValidator } from '../../externals/validators';

@injectable()
export class FindAllPermissionsController implements Controller {
  constructor(
    @inject(FindAllPermissionsUseCase)
    readonly useCase: FindAllPermissionsUseCase,
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const filter = FindAllPermissionsSchemaValidator.parse(req.query);
    const result = await this.useCase.execute(filter);
    return res.json(result.map(createPermissionList));
  }
}
