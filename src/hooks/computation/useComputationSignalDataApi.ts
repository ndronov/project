import { getComputationSignalDataApi, getRawComputationSignalDataApi } from '@/api';
import { ComputationSignalVariant } from '@/types';

export function useComputationSignalDataApi(variant: ComputationSignalVariant) {
  return variant === 'global' ? getRawComputationSignalDataApi : getComputationSignalDataApi;
}
