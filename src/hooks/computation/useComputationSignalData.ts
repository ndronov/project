import { useCallback, useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import { computationSignalActivePointIndexState, computationSignalDataState } from '@/stores';
import { ComputationSignalVariant } from '@/types';

import { useComputationSignalDataApi } from './useComputationSignalDataApi';

interface UseComputationSignalDataArgs {
  prefetch?: boolean;
  variant: ComputationSignalVariant;
}

export function useComputationSignalData(args: UseComputationSignalDataArgs) {
  const { prefetch = false, variant } = args;

  const setData = useSetRecoilState(computationSignalDataState);
  const setActivePointIndex = useSetRecoilState(computationSignalActivePointIndexState);

  const getComputationSignalDataApi = useComputationSignalDataApi(variant);

  const fetchData = useCallback(async () => {
    const params = {};

    const response = await getComputationSignalDataApi(params);

    if (!response.success) return;

    setActivePointIndex(response.data.graph.data.length - 1);
    setData(response.data);
  }, [getComputationSignalDataApi, setActivePointIndex, setData]);

  useEffect(() => {
    if (prefetch) void fetchData();
  }, [fetchData, prefetch]);
}
