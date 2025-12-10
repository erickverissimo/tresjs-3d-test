import { injectable } from 'inversify';
import axios from 'axios';
import { HttpRequest, HttpResponse, RequestConfig } from '../../core';

@injectable()
export class AxiosHttpRequest implements HttpRequest {
  get<R>(url: string, opts?: RequestConfig): Promise<HttpResponse<R>> {
    return axios.get(url, {
      responseType: opts?.responseType,
      headers: opts?.headers as any,
    });
  }
  post<R>(
    url: string,
    data: any,
    opts?: RequestConfig
  ): Promise<HttpResponse<R>> {
    return axios.post(url, {
      data,
      headers: opts?.headers as any,
    });
  }
  head<R>(url: string): Promise<HttpResponse<R>> {
    return axios.head(url);
  }
}
