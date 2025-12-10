import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, UpdatePermissionUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createPermissionDetail } from '../../factories/dto';
import { UpdatePermissionSchemaValidator } from '../../externals/validators';

@injectable()
export class UpdatePermissionController implements Controller {
  constructor(
    @inject(UpdatePermissionUseCase) readonly useCase: UpdatePermissionUseCase
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const data = UpdatePermissionSchemaValidator.parse(req.body);

    const result = await this.useCase.execute({ ...data, id: req.params.id });
    return res.json(createPermissionDetail(result));
  }
}
