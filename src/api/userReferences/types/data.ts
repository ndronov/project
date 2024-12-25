import { Meta } from '@/api';
import { Relationship, UserReferencesMap } from '@/types';

export interface UserReferencesData {
  blacklists: Relationship[];
  users: UserReferencesMap;
  meta: Meta;
}

export interface RawUserReferencesData {
  follows: Relationship[];
  users: UserReferencesMap;
  meta: Meta;
}
