import { atom } from 'recoil';

import { RippleType } from '@/types';

export const ripplesState = atom<Record<string, RippleType[] | null>>({
  key: 'ripplesState',
  default: {},
});
