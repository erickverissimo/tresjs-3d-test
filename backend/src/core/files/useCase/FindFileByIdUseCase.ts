import { inject, injectable } from 'inversify';
import { UseCase } from '../../shared';
import { FileUpload } from '../model/FileUpload';
import { FindFileByIdService } from '../service';

@injectable()
export class FindFileByIdUseCase implements UseCase<string, FileUpload> {
  constructor(
    @inject(FindFileByIdService)
    private readonly service: FindFileByIdService,
  ) {}

  async execute(id: string): Promise<FileUpload> {
    const file = await this.service.execute(id);
    return file;
  }
}
