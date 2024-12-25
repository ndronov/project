import axios, { AxiosError } from 'axios';

import {
  ApiResponse,
  ComplainArgs,
  ErrorResponseData,
  GetNicknameSuggestionsData,
  SignInArgs,
  SignUpArgs,
  UpdateProfileArgs,
  get,
  mapToResponseErrors,
  patch,
  post,
} from '@/api';
import { CurrentUser, Invite, SyncAttrs, UserReference } from '@/types';

import { mapToNicknameSuggestions } from './mappers';

export async function signUpApi(args: SignUpArgs): Promise<ApiResponse> {
  try {
    await post(`/v1/users`, JSON.stringify(args));

    return { success: true, data: undefined };
  } catch (e) {
    const axiosError = e as AxiosError<ErrorResponseData>;

    const { formErrors, error } = mapToResponseErrors(axiosError.response?.data);

    return { success: false, formErrors, error };
  }
}

export async function signInApi(args: SignInArgs): Promise<ApiResponse> {
  try {
    await post(`/v1/login`, JSON.stringify(args));

    return { success: true, data: undefined };
  } catch (e) {
    const axiosError = e as AxiosError<ErrorResponseData>;

    const { formErrors, error } = mapToResponseErrors(axiosError.response?.data);

    return { success: false, formErrors, error };
  }
}

export async function activateReadOnlyModeApi(): Promise<ApiResponse> {
  try {
    await post<UserReference>(`/v1/login/read`);

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function getCurrentUserApi(): Promise<ApiResponse<CurrentUser>> {
  try {
    const { data } = await get<UserReference>(`/v1/profile`);

    return { success: true, data };
  } catch (e) {
    const axiosError = e as AxiosError;
    const code = axiosError.response?.status ?? -1;
    const canceled = axios.isCancel(axiosError);

    return { success: false, canceled, code };
  }
}

export async function updateProfileApi(args: UpdateProfileArgs): Promise<ApiResponse> {
  try {
    await patch(`/v1/users`, JSON.stringify(args));

    return { success: true, data: undefined };
  } catch (e) {
    const axiosError = e as AxiosError<ErrorResponseData>;

    const { formErrors, error } = mapToResponseErrors(axiosError.response?.data);

    return { success: false, formErrors, error };
  }
}

export async function getInviteApi(): Promise<ApiResponse<Invite>> {
  try {
    const { data } = await get<Invite>(`/v1/invite`);

    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export async function getNicknameSuggestionsApi(): Promise<ApiResponse<string[]>> {
  try {
    const { data } = await get<GetNicknameSuggestionsData>(`/v1/nicks`);

    return { success: true, data: mapToNicknameSuggestions(data) };
  } catch {
    return { success: false };
  }
}

export async function sendFeedbackApi(text: string): Promise<ApiResponse> {
  try {
    await post(`/v1/feedback`, JSON.stringify({ text }));

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function complainApi(args: ComplainArgs): Promise<ApiResponse> {
  try {
    await post(`/v1/complaints`, JSON.stringify(args));

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function getSyncAttrsApi(): Promise<ApiResponse<SyncAttrs>> {
  try {
    const { data } = await post<SyncAttrs>(`/v1/login/token`);

    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export async function sendSyncToken(token: string): Promise<ApiResponse> {
  try {
    await post(`/v1/login/token/accept?token=${token}`);

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function checkSyncApi(token: string): Promise<ApiResponse> {
  try {
    await post(`/v1/login/mobile?token=${token}`);

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}
