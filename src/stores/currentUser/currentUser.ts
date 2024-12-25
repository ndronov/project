import { atom } from 'recoil';

import { AuthStatus, CurrentUser, Nullable } from '@/types';

export const nicknameSuggestionsState = atom<string[]>({
  key: 'nicknameSuggestionsState',
  default: [],
});

export const currentUserState = atom<Nullable<CurrentUser>>({
  key: 'currentUserState',
  default: null,
});

export const currentUserAuthStatusState = atom<AuthStatus>({
  key: 'currentUserAuthStatusState',
  default: AuthStatus.Unknown,
});

export const syncQrCodeDialogVisibleState = atom<boolean>({
  key: 'syncQrCodeDialogVisibleState',
  default: false,
});
