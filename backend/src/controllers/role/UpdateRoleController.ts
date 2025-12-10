import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, UpdateRoleUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createRoleDetail } from '../../factories/dto';
import { UpdateRoleSchemaValidator } from '../../externals/validators';

@injectable()
export class UpdateRoleController implements Controller {
  constructor(@inject(UpdateRoleUseCase) readonly useCase: UpdateRoleUseCase) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const data = UpdateRoleSchemaValidator.parse(req.body);

    const result = await this.useCase.execute({ ...data, id: req.params.id });
    return res.json(createRoleDetail(result));
  }
}
