import { GetNicknameSuggestionsData } from '@/api';

export function mapToNicknameSuggestions(data: GetNicknameSuggestionsData) {
  return data.nicks;
}
