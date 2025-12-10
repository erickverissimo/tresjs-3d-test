export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

export interface RequestConfig {
  responseType?: ResponseType;
  headers?: Map<string, any>;
}

export interface HttpResponse<T> {
  headers: Map<string, any>;
  data: T;
}

export abstract class HttpRequest {
  abstract get<R>(url: string, opts?: RequestConfig): Promise<HttpResponse<R>>;
  abstract head<R>(url: string, opts?: RequestConfig): Promise<HttpResponse<R>>;
}
