import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { Controller, LoginInput, LoginUseCase } from '../../core';

import { createUserDetail } from '../../factories/dto';

@injectable()
export class LoginController implements Controller {
  constructor(@inject(LoginUseCase) readonly useCase: LoginUseCase) {}

  async execute(req: Request, res: Response) {
    const body: LoginInput = req.body;

    const result = await this.useCase.execute(body);

    const data = {
      token: result.token,
      user: createUserDetail(result.user),
      permissions: Array.from(result.permissions),
    };

    return res.status(200).json(data);
  }
}
