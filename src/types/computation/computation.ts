import { Periodicity } from '@/types';

export interface ComputationSignalData {
  graph: {
    data: number[];
    dates: number[];
    min: number;
    max: number;
    minDate: number; // timestamp
    maxDate: number; // timestamp
  };
  currentValue: number;
  previousValue: number;
  periodicity: Periodicity;
}

export type ComputationSignalVariant = 'global' | 'local';
