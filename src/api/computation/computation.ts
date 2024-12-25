import { ApiResponse, get } from '@/api';
import { ComputationSignalData } from '@/types';

import { GetComputationSignalDataArgs } from './types';

export async function getComputationSignalDataApi(
  args: GetComputationSignalDataArgs,
): Promise<ApiResponse<ComputationSignalData>> {
  try {
    const response = await get<ComputationSignalData>(`/v2/computation`, { params: args });

    const { data } = response;

    return { success: true, data };
  } catch {
    return { success: false };
  }
}

export async function getRawComputationSignalDataApi(
  args: GetComputationSignalDataArgs,
): Promise<ApiResponse<ComputationSignalData>> {
  try {
    const response = await get<ComputationSignalData>(`/v2/graph/raw`, { params: args });

    const { data } = response;

    return { success: true, data };
  } catch {
    return { success: false };
  }
}
