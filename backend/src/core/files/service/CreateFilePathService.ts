import { injectable } from 'inversify';
import { Environment } from '../../../config/environment';

@injectable()
export class CreateFilePathService {
  execute(resource?: string, resourceId?: string): string {
    let path = Environment.getFileBasePath();
    path += resource ? `/${resource}` : '';
    path += resourceId ? `/${resourceId}` : '';

    return path;
  }
}
