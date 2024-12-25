import { Mapped, Relationship, UserReference } from '@/types';

export type UserReferencesMap = Mapped<string, UserReference>;

export interface LazyUserReferenceData {
  after?: string;
  blacklists?: Relationship[];
  users: UserReference[];
}
