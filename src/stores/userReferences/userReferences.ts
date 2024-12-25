import { atom } from 'recoil';

import { Nullable, UserReference } from '@/types';

export const someUserReferenceState = atom<Nullable<UserReference>>({
  key: 'someUserReferenceState',
  default: null,
});

// компонент VirtualScroller требует явно задать количество элементов
const MAX_LAZY_USERS_NUMBER = 1000;
const blankLazyUsers = Array.from({ length: MAX_LAZY_USERS_NUMBER }) as Nullable<UserReference>[];

export const lazyUserReferencesState = atom<Nullable<UserReference>[]>({
  key: 'lazyUserReferencesState',
  default: blankLazyUsers,
});
