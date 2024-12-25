import React, { useCallback, useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { mainContainerScrollToTopCallbackState, mainContainerState, mainScrollTopState } from '@/stores';
import { Fn } from '@/types';

interface UseMainContainerArgs {
  afterScrollToTop?: Fn;
}

export function useMainContainer(args: UseMainContainerArgs = {}) {
  const { afterScrollToTop } = args;

  const containerRef = useRef<HTMLDivElement>(null);

  const [mainContainer, setMainContainer] = useRecoilState(mainContainerState);

  const [mainContainerScrollToTopCallback, setMainContainerScrollToTopCallback] = useRecoilState(
    mainContainerScrollToTopCallbackState,
  );

  const [scrollTop, setScrollTop] = useRecoilState(mainScrollTopState);

  const onTop = scrollTop === 0;

  useEffect(() => {
    if (!containerRef.current) return;

    setMainContainer(containerRef.current);
  }, [setMainContainer]);

  useEffect(() => {
    if (!afterScrollToTop) return;

    setMainContainerScrollToTopCallback(afterScrollToTop);

    // eslint-disable-next-line consistent-return
    return () => setMainContainerScrollToTopCallback(null);
  }, [afterScrollToTop, setMainContainerScrollToTopCallback]);

  const scrollTo = useCallback(
    (top: number) => {
      mainContainer?.scrollTo({
        top,
        behavior: 'smooth',
      });
    },
    [mainContainer],
  );

  const scrollToTop = useCallback(() => {
    scrollTo(0);

    mainContainerScrollToTopCallback?.();
  }, [mainContainerScrollToTopCallback, scrollTo]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    containerRef,
    handleScroll,
    onTop,
    scrollTo,
    scrollToTop,
    scrollTop,
  };
}
