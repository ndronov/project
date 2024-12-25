import { Draft } from '@/types';

export interface LazyDraftsData {
  drafts: Draft[];
  after?: string;
}
