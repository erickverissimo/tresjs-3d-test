import { injectable } from 'inversify';

@injectable()
export abstract class MimeTypeResolver {
  abstract extension(type: string): string | false;
}
