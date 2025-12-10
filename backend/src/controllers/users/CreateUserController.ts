import { Response, Request } from 'express';
import { CreateUserUseCase } from '../../core';
import { createUserDetail } from '../../factories/dto';
import { CreateUserSchemaValidator } from '../../externals/validators/users/createUserSchema';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateUserController {
  constructor(@inject(CreateUserUseCase) readonly useCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response) {
    const user = CreateUserSchemaValidator.parse(req.body);
    const result = await this.useCase.execute(user);
    return res.json(createUserDetail(result));
  }
}
