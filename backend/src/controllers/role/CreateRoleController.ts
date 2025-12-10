import { Response, Request } from 'express';
import { Controller, CreateRoleUseCase } from '../../core';

import { CreateRoleSchemaValidator } from '../../externals/validators/role/createRoleSchema';
import { createRoleDetail } from '../../factories';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateRoleController implements Controller {
  constructor(@inject(CreateRoleUseCase) readonly useCase: CreateRoleUseCase) {}

  async execute(req: Request, res: Response) {
    const role = CreateRoleSchemaValidator.parse(req.body);
    const result = await this.useCase.execute(role);
    return res.json(createRoleDetail(result));
  }
}
