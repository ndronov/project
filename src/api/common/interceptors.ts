import {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  AxiosRequestConfigWithAbortController,
  AxiosRequestData,
  IGNORE_SESSION_ID_ENDPOINTS,
  PendingRequestConfig,
  getSessionId,
  getSessionToken,
  setSessionId,
} from '@/api';
import { DEFAULT_ROUTE, ENTER_ROUTE, UNPROTECTED_ROUTES } from '@/common';

import { encryptWithSalt } from './crypto';

const pendingRequests = new Map<string, PendingRequestConfig>();

function getBaseUrl(url = '') {
  return url;
}

function removeFromPendingRequests(config?: AxiosRequestConfig) {
  const baseUrl = getBaseUrl(config?.url);

  pendingRequests.delete(baseUrl);
}

export function isDuplicate(config: AxiosRequestConfig) {
  const { method, url } = config;

  if (method !== 'get') return false;

  const baseUrl = getBaseUrl(url);
  const pendingRequestConfig = pendingRequests.get(baseUrl);

  return config.url === pendingRequestConfig?.url;
}

function checkDuplication(config: AxiosRequestConfigWithAbortController<AxiosRequestData>) {
  const { url } = config;
  const baseUrl = getBaseUrl(url);

  if (isDuplicate(config)) {
    config.abortController?.abort();

    return;
  }

  // eslint-disable-next-line no-param-reassign
  delete config.abortController;

  pendingRequests.set(baseUrl, { url });
}

function addSessionHeaders(config: InternalAxiosRequestConfig<AxiosRequestData>) {
  const { url, headers, method } = config;

  const sessionId = getSessionId();
  const sessionToken = getSessionToken();
  const encryptedSessionToken = encryptWithSalt(sessionToken);

  const axiosHeaders = headers as AxiosHeaders;
  const baseUrl = getBaseUrl(url);

  const shouldIgnore = IGNORE_SESSION_ID_ENDPOINTS.includes(baseUrl) && method === 'post';

  if (!shouldIgnore) {
    axiosHeaders.set('X-Session-Id', sessionId);
  }

  axiosHeaders.set('X-Session-Token', encryptedSessionToken);
}

export function requestSuccessInterceptor(
  config: InternalAxiosRequestConfig<AxiosRequestData>,
): InternalAxiosRequestConfig {
  addSessionHeaders(config);
  checkDuplication(config);

  return config;
}

export function requestErrorInterceptor(error: AxiosError): Promise<never> {
  removeFromPendingRequests(error.config);

  return Promise.reject(error);
}

export function responseSuccessInterceptor(
  response: AxiosResponse<unknown>,
): AxiosResponse<unknown> | Promise<AxiosResponse<unknown>> {
  removeFromPendingRequests(response.config);

  const headers = response.headers as AxiosHeaders;
  const sessionId = headers.get('X-Session-Id') as string;

  setSessionId(sessionId);

  return response;
}

export function responseErrorInterceptor(error: AxiosError): Promise<AxiosResponse<unknown> | undefined> {
  removeFromPendingRequests(error.config);

  const unauthorized = error.response?.status === HttpStatusCode.Unauthorized;

  if (unauthorized) {
    pendingRequests.clear();

    if (!UNPROTECTED_ROUTES.includes(window.location.pathname)) {
      window.location.replace(ENTER_ROUTE);
    }
  }

  const notFound = error.response?.status === HttpStatusCode.NotFound && error.config?.method === 'get';

  if (notFound) {
    pendingRequests.clear();
    window.location.replace(DEFAULT_ROUTE);
  }

  return Promise.reject(error);
}
