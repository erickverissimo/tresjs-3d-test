import { Container } from 'inversify';
import { MongooseUnitOfWork, MimeTypeImplementation } from '../../provider';
import { AxiosHttpRequest } from '../../externals/http/AxiosHttpRequest';
import { HttpRequest, MimeTypeResolver, UnitOfWork } from '../../core/shared';

export function registerSharedModule(container: Container) {
  container.bind(UnitOfWork).to(MongooseUnitOfWork);
  container.bind(HttpRequest).to(AxiosHttpRequest);
  container.bind(MimeTypeResolver).to(MimeTypeImplementation);
}
