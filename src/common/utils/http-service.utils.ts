import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

@Injectable()
export class HttpService {
  private logger = new Logger(HttpService.name);

  async request<T>(
    method: Method,
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers,
    };

    return axios.request<T>(config);
  }

  async get<T>(
    url: string,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>('get', url, undefined, params, headers);
  }

  async post<T>(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    try {
      return this.request<T>('post', url, data, params, headers);
    } catch (e) {
      this.logger.error('HTTP POST ERROR', e);
      throw e;
    }
  }

  async put<T>(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>('put', url, data, params, headers);
  }

  async patch<T>(
    url: string,
    data?: any,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>('patch', url, data, params, headers);
  }

  async delete<T>(
    url: string,
    params?: any,
    headers?: any,
  ): Promise<AxiosResponse<T>> {
    return this.request<T>('delete', url, undefined, params, headers);
  }
}
