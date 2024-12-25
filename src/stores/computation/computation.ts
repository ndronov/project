import { atom } from 'recoil';

import { ComputationSignalData, Nullable, TimeSpan } from '@/types';

export const computationSignalTimeSpanState = atom<TimeSpan>({
  key: 'computationSignalTimeSpanState',
  default: TimeSpan.Day,
});

export const computationSignalActivePointIndexState = atom<number>({
  key: 'computationSignalActivePointIndexState',
  default: -1,
});

export const computationSignalDataState = atom<Nullable<ComputationSignalData>>({
  key: 'computationSignalDataState',
  default: null,
});
