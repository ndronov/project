import { AxiosRequestConfig } from 'axios';

export type AxiosRequestData = string | object | undefined;

export interface AxiosRequestConfigWithAbortController<Data = unknown> extends AxiosRequestConfig<Data> {
  abortController?: AbortController;
}

export interface PendingRequestConfig {
  url?: string;
}
