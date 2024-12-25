import { ApiResponse, DraftsData, GetDraftsArgs, get } from '@/api';
import { LazyDraftsData } from '@/types';

import { mapToLazyDraftsData } from './mappers';

export async function getDraftsApi(params: GetDraftsArgs): Promise<ApiResponse<LazyDraftsData>> {
  try {
    const { data } = await get<DraftsData>(`/v1/drafts`, { params });

    return { success: true, data: mapToLazyDraftsData(data) };
  } catch {
    return { success: false };
  }
}
