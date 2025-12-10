import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import { CryptoProvider } from '../../core';

@injectable()
export class CryptoProviderImplementation implements CryptoProvider {
  compare(entry: string, hash: string): boolean {
    return bcrypt.compareSync(entry, hash);
  }
  hash(entry: string): string {
    return bcrypt.hashSync(entry);
  }
}
