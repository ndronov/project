import { VirtualScrollerLazyEvent } from 'primereact/virtualscroller';

import { Nullable } from '@/types';

export interface UseFetchDataArgs {
  prefetch?: boolean;
  autoRefresh?: boolean;
}

export interface UseLazyItems<Item = unknown> {
  lazyItems: Array<Nullable<Item>>;
  loading: boolean;
  onLazyLoad: (e: VirtualScrollerLazyEvent) => void;
}
