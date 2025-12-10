import { Response, Request } from 'express';
import { Controller, CreatePermissionUseCase } from '../../core';

import { CreatePermissionSchemaValidator } from '../../externals/validators/permission/createPermissionSchema';
import { createPermissionDetail } from '../../factories';
import { inject, injectable } from 'inversify';

@injectable()
export class CreatePermissionController implements Controller {
  constructor(
    @inject(CreatePermissionUseCase) readonly useCase: CreatePermissionUseCase
  ) {}

  async execute(req: Request, res: Response) {
    const permission = CreatePermissionSchemaValidator.parse(req.body);
    const result = await this.useCase.execute(permission);
    return res.json(createPermissionDetail(result));
  }
}
