import React from 'react';

import clsx from 'clsx';

import { WHITE } from '@/common';

import styles from './Ripple.module.css';
import { useRipple, useRippleCleanUp } from './hooks';

const DEFAULT_DURATION = 3000;

interface Props {
  color?: string;
  duration?: number;
  id?: string;
}

export function Ripple(props: Props) {
  const { color = WHITE, duration = DEFAULT_DURATION, id = '' } = props;

  const { ripples, clearRipples } = useRipple({ id });

  useRippleCleanUp(duration, ripples.length, clearRipples);

  return (
    <>
      {ripples.map((ripple, index) => (
        <div
          data-emotion-increase-area=""
          key={index}
          className={clsx('absolute border-circle', styles.ripple)}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            animationDuration: `${duration}ms`,
            backgroundColor: color,
          }}
        />
      ))}
    </>
  );
}
