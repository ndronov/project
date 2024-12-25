import React from 'react';

import clsx from 'clsx';

import { Fn } from '@/types';

import styles from './LoaderWave.module.css';

interface Props {
  style: React.CSSProperties;
  onAnimationStart: Fn;
}

export function LoaderWave(props: Props) {
  const { style, onAnimationStart } = props;

  return (
    <div
      className={clsx(styles.circle, 'absolute w-full h-full border-circle')}
      style={style}
      onAnimationStart={onAnimationStart}
    />
  );
}
