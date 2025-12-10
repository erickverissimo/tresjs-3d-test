import { injectable } from 'inversify';

@injectable()
export abstract class UnitOfWork {
  abstract startTransaction(): Promise<void>;
  abstract commitTransaction(): Promise<void>;
  abstract abortTransaction(): Promise<void>;
  abstract getSession(): any | undefined;
}
