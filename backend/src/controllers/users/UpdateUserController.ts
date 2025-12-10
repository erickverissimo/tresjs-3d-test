import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { Controller, UpdateUserUseCase } from '../../core';

import { AuthenticatedRequest } from '../../middlewares/auth';

import { createUserDetail } from '../../factories/dto';
import { UpdateUserSchemaValidator } from '../../externals/validators';

@injectable()
export class UpdateUserController implements Controller {
  constructor(@inject(UpdateUserUseCase) readonly useCase: UpdateUserUseCase) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const data = UpdateUserSchemaValidator.parse(req.body);

    const result = await this.useCase.execute({ ...data, id: req.params.id });
    return res.json(createUserDetail(result));
  }
}
