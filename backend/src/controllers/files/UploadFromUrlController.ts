import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth';
import { UploadFromURLFacade, Controller } from '../../core';

@injectable()
export class UploadFromUrlController implements Controller {
  constructor(
    @inject(UploadFromURLFacade) readonly facade: UploadFromURLFacade,
  ) {}

  async execute(req: AuthenticatedRequest, res: Response) {
    const result = await this.facade.execute(req.body);
    return res.json(result);
  }
}
