import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getBrowserLanguage } from '@/api';
import { API_URL } from '@/common';

import {
  requestErrorInterceptor,
  requestSuccessInterceptor,
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from './interceptors';

axios.defaults.baseURL = API_URL;
axios.defaults.paramsSerializer = { indexes: null };
axios.defaults.headers['Accept-Language'] = getBrowserLanguage();
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

axios.interceptors.request.use(requestSuccessInterceptor, requestErrorInterceptor);
axios.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

export function get<D>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<D>> {
  const abortController = new AbortController();
  const configWithAbortController = {
    ...config,
    abortController,
    signal: abortController.signal,
  };

  return axios.get<D>(url, configWithAbortController);
}

export function post<D>(url: string, data?: string | FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<D>> {
  return axios.post<D>(url, data, config);
}

export function patch<D>(
  url: string,
  data?: string | FormData,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<D>> {
  return axios.patch<D>(url, data, config);
}

export function put<D>(url: string, data?: string | FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<D>> {
  return axios.put<D>(url, data, config);
}

export function del(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
  return axios.delete(url, config);
}
