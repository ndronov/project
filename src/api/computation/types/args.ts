import { Periodicity } from '@/types';

export interface GetComputationSignalDataArgs {
  circleId?: string;
  dateStart?: number; // Default: one week ago
  dateEnd?: number; // Default: current date
  lat?: number;
  lng?: number;
  periodicity?: Periodicity; // Default: HOURS
  radius?: number; // Radius from lat & lng in meters
  userId?: string;
}
