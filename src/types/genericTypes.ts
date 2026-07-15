import type { AxiosError } from "axios";

export type ApiResponse<T> = {
  error_details: string | null;
  is_success: boolean;
  message: string;
  response: T;
  status_code: number;
};

export type ErrorFaRs = {
  type: string;
  code: string;
  detail: string;
  attr: string;
  fa_details: string;
};

export type ApiErrorResponse = {
  error_details: ErrorFaRs;
  is_success: boolean;
  message: string;
  response: string | null;
  status_code: number;
};

export type AppAxiosError = AxiosError<ApiErrorResponse>;
