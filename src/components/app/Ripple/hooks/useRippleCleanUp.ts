import { useLayoutEffect } from 'react';

import { useUnmountEffect } from 'primereact/hooks';

import { Fn } from '@/types';

export function useRippleCleanUp(duration: number, rippleCount: number, clear: Fn) {
  useLayoutEffect(() => {
    let timeoutId = -1;

    if (rippleCount > 0) {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        clear();
        clearTimeout(timeoutId);
      }, duration * 4);
    }

    return () => clearTimeout(timeoutId);
  }, [clear, duration, rippleCount]);

  useUnmountEffect(clear);
}
