import { useRecoilState } from 'recoil';

import { getNicknameSuggestionsApi } from '@/api';
import { nicknameSuggestionsState } from '@/stores';

export function useNicknameSuggestions() {
  const [suggestions, setSuggestions] = useRecoilState(nicknameSuggestionsState);

  const fetchSuggestions = async () => {
    const response = await getNicknameSuggestionsApi();

    if (!response.success) return [];

    return response.data;
  };

  const suggestNickname = async () => {
    const availableSuggestions = suggestions.length > 0 ? suggestions : await fetchSuggestions();

    if (availableSuggestions.length === 0) return '';

    const [firstSuggestion, ...restSuggestions] = availableSuggestions;

    setSuggestions(restSuggestions);

    return firstSuggestion;
  };

  return suggestNickname;
}
