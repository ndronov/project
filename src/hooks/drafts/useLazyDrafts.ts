import { useCallback, useRef, useState } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { useDebounce } from 'ahooks';
import { VirtualScrollerLazyEvent } from 'primereact/virtualscroller';

import { getDraftsApi } from '@/api';
import { draftsNicknameFilterState } from '@/stores';
import { Draft, Nullable } from '@/types';

const SEARCH_INPUT_DEBOUNCE_DELAY = 300;

// компонент VirtualScroller требует явно задать количество элементов
const MAX_LAZY_DRAFTS_NUMBER = 1000;
const blankLazyItems = Array.from({ length: MAX_LAZY_DRAFTS_NUMBER }) as Nullable<Draft>[];

export function useLazyDrafts() {
  const [lazyItems, setLazyItems] = useState(blankLazyItems);
  const [itemsNumber, setItemsNumber] = useState(0);

  const [after, setAfter] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  const noMoreData = after == null;
  const emptyResults = noMoreData && lazyItems.length === 0;

  const [nickName, setNickName] = useRecoilState(draftsNicknameFilterState);
  const clearNickName = useResetRecoilState(draftsNicknameFilterState);

  const nickNameDebounced = useDebounce(nickName, { wait: SEARCH_INPUT_DEBOUNCE_DELAY });

  const loadLazyTimeout = useRef<number | null>(null);

  const onLazyLoad = useCallback(
    async (event: VirtualScrollerLazyEvent) => {
      const limit = (event.last as number) - itemsNumber + 1;

      const invalidParams = limit < 1;

      if (loading || invalidParams || noMoreData) return;

      if (loadLazyTimeout.current) {
        window.clearTimeout(loadLazyTimeout.current ?? 0);
        loadLazyTimeout.current = null;
      }

      const fetchItems = async () => {
        setLoading(true);

        const args = {
          limit,
          after: after || undefined,
          nickName: nickName || undefined,
        };

        const response = await getDraftsApi(args);

        setLoading(false);

        if (!response.success) return;

        const items = [...lazyItems];

        for (let i = 0; i < response.data.drafts.length; i++) {
          items[itemsNumber + i] = response.data.drafts[i];
        }

        const newItemsNumber = itemsNumber + response.data.drafts.length;

        if (!response.data.after) {
          items.length = newItemsNumber;
        }

        setLazyItems(items);
        setItemsNumber(newItemsNumber);
        setAfter(response.data.after);
      };

      loadLazyTimeout.current = window.setTimeout(fetchItems, 0);
    },
    [after, itemsNumber, lazyItems, loading, nickName, noMoreData],
  );

  const clearData = () => {
    clearNickName();
  };

  return {
    clearData,
    emptyResults,
    lazyItems,
    loading,
    nickName,
    nickNameDebounced,
    onLazyLoad,
    setNickName,
  };
}
