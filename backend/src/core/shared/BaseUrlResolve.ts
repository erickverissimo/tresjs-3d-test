import { Environment } from '../../config/environment';

export interface IBaseUrlResolve {
  getProtocol(): string;
  getHost(): string;
}

export function getBaseUrl(): string {
  // return resolver.getProtocol() + '://' + resolver.getHost();
  return (
    Environment.getApiBaseUrl() ?? 'https://oxy-center-api.brx-bionic.com.br'
  );
}
