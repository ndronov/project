import React from 'react';

import { useRecoilState } from 'recoil';

import { ripplesState } from '@/stores';

interface Args {
  id?: string;
  size?: number;
}

export function useRipple(args: Args = {}) {
  const { id = '', size = 0 } = args;

  const [ripplesRecord, setRipplesRecord] = useRecoilState(ripplesState);

  const addRipple = (event: React.MouseEvent, anchor?: HTMLElement) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const anchorRect = anchor?.getBoundingClientRect();

    const center = anchorRect
      ? {
          x: anchorRect.left + anchorRect.width / 2,
          y: anchorRect.top + anchorRect.height / 2,
        }
      : {
          x: event.pageX,
          y: event.pageY,
        };

    const rippleSize = size || Math.max(containerRect.width, containerRect.height);
    const x = center.x - containerRect.x - rippleSize / 2;
    const topOffset = event.currentTarget?.scrollTop ?? 0;
    const y = center.y - containerRect.y + topOffset - rippleSize / 2;

    setRipplesRecord((currentRecord) => {
      const currentRipples = currentRecord[id] ?? [];

      return {
        ...currentRecord,
        [id]: [...currentRipples, { x, y, size: rippleSize }],
      };
    });
  };

  const clearRipples = () => {
    setRipplesRecord((currentRecord) => {
      const updatedRecord = { ...currentRecord };

      delete updatedRecord[id];

      return updatedRecord;
    });
  };

  const ripples = ripplesRecord[id] ?? [];

  return {
    addRipple,
    clearRipples,
    ripples,
  };
}
