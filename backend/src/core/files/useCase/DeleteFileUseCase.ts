import { inject, injectable } from 'inversify';
import { FileUploadRepository } from '../provider/FileUploadRepository';
import { AppObjectNotFoundError } from '../../../errors';
import { Errors, UseCase } from '../../shared';

@injectable()
export class DeleteFileUseCase implements UseCase<string, string> {
  constructor(
    @inject(FileUploadRepository)
    private readonly repository: FileUploadRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const file = await this.repository.findById(id);

    if (!file?.id) {
      throw new AppObjectNotFoundError(Errors.OBJECT_NOT_FOUND);
    }
    await this.repository.delete(file.id);

    return file.id;
  }
}
