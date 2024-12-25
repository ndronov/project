import { Meta } from '@/api';

export interface GetNicknameSuggestionsData {
  meta: Meta;
  nicks: string[];
}
