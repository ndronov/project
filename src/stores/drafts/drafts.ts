import { atom } from 'recoil';

export const draftsNicknameFilterState = atom<string>({
  key: 'draftsNicknameFilterState',
  default: '',
});
