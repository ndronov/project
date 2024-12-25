import { Mapped } from '@/types';

export interface SuccessResponse<Data> {
  success: true;
  data: Data;
}

export type FormErrors = Mapped<string, string>;

export interface ErrorResponse {
  canceled?: boolean;
  code?: number;
  error?: string;
  formErrors?: FormErrors;
  success: false;
}

export type ApiResponse<Data = void> = SuccessResponse<Data> | ErrorResponse;

export type ErrorResponseData = CustomErrorResponseData | StandardErrorResponseData | null;

export interface StandardErrorResponseData {
  error: string;
  path: string;
  status: number;
  timestamp: number;
}

export interface FieldError<Field = string> {
  msg: string;
  field: Field;
  code: string;
}

export interface CustomErrorResponseData {
  errors: Array<FieldError>;
}

export interface Paging {
  count: number;
  nextPageUrl?: string;
  prevPageUrl?: string;
}

export interface Meta {
  paging: Paging;
}
