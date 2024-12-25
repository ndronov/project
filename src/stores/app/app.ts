import { atom } from 'recoil';

import { Fn, Nullable } from '@/types';

export const mainContainerState = atom<Nullable<HTMLDivElement>>({
  key: 'mainContainerState',
  default: null,
});

export const mainContainerScrollToTopCallbackState = atom<Nullable<Fn>>({
  key: 'mainContainerScrollToTopCallbackState',
  default: null,
});

export const mainScrollTopState = atom<number>({
  key: 'mainScrollTopState',
  default: 0,
});
