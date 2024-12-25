import {
  ApiResponse,
  GetRawUserReferencesArgs,
  GetUserReferencesArgs,
  RawUserReferencesData,
  UserReferencesData,
  del,
  get,
  put,
} from '@/api';
import { LazyUserReferenceData, UserReference } from '@/types';

import { mapToFollowUsersData, matToUserReferencesData } from './mappers';

export async function getUserReferenceApi(args: GetUserReferencesArgs): Promise<ApiResponse<LazyUserReferenceData>> {
  try {
    const response = await get<UserReferencesData>(`/v1/user`, { params: args });

    const data = matToUserReferencesData(response.data);

    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export async function createUserReferenceApi(userId: string): Promise<ApiResponse> {
  try {
    await put(`/v1/user`, undefined, { params: { userId } });

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function deleteUserReferenceApi(userId: string): Promise<ApiResponse> {
  try {
    await del(`/v1/user/${userId}`);

    return { success: true, data: undefined };
  } catch {
    return { success: false };
  }
}

export async function getRawUserReferenceApi(
  args: GetRawUserReferencesArgs,
): Promise<ApiResponse<LazyUserReferenceData>> {
  try {
    const { userId, ...params } = args;

    const response = await get<RawUserReferencesData>(`/v1/users/${userId}/following`, { params });

    const data = mapToFollowUsersData(response.data);

    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export async function getSomeUserReferenceApi(userId: string): Promise<ApiResponse<UserReference>> {
  try {
    const { data } = await get<UserReference>(`/v1/users/${userId}`);

    return { success: true, data };
  } catch {
    return { success: false };
  }
}
