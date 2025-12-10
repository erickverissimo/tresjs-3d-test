import mongoose, { ClientSession } from 'mongoose';
import { UnitOfWork } from '../core/shared/provider/UnitOfWork';
import { injectable } from 'inversify';

@injectable()
export class MongooseUnitOfWork implements UnitOfWork {
  private session?: ClientSession;

  async startTransaction(): Promise<void> {
    this.session = await mongoose.connection.startSession();
    this.session.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.session) {
      await this.session.commitTransaction();
      this.session.endSession();
      this.session = undefined;
    }
  }

  async abortTransaction(): Promise<void> {
    if (this.session) {
      await this.session.abortTransaction();
      this.session.endSession();
      this.session = undefined;
    }
  }

  getSession(): ClientSession | undefined {
    return this.session;
  }
}
