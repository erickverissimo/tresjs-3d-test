import { injectable } from 'inversify';
import { User } from '../model/User';
import { FilterUser, FilterPasswordRecover } from '../filter';
import { ResultPaginate } from '../../shared/paginate/ResultPaginate';
import { FilterPaginate } from '../../shared';

@injectable()
export abstract class UserRepository {
  abstract findAll(filter?: FilterUser): Promise<User[]>;
  abstract paginate(
    filter: FilterPaginate<FilterUser>
  ): Promise<ResultPaginate<User>>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract update(user: User, session?: any): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract exists(id: string): Promise<boolean>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract existsWithEmail(email: string, id?: string): Promise<boolean>;
}
