import { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { computationSignalTimeSpanState } from '@/stores';

import { getDateRange } from './logic';

export function useEmotionGraphPeriodParams() {
  const timeSpan = useRecoilValue(computationSignalTimeSpanState);

  return useMemo(() => getDateRange(timeSpan), [timeSpan]);
}
