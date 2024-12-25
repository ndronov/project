import React from 'react';

import clsx from 'clsx';

import { LoaderWave } from '@/components';
import { Fn } from '@/types';

import styles from './LoaderWaves.module.css';

interface Props {
  onLastWaveStart?: Fn;
}

const moodOptions = [
  0, // dead
  2, // broke-ass-2
  4, // broke-ass-4
  6, // troubled-2
  8, // bad-1
  10, // silly-1
  14, // good-2
  16, // well-done-2
  18, // cheerful-2
  20, // high-af-1
  22, // high-af-3
  24, // in-love
];

const DELAY_STEP = 500;

export function LoaderWaves(props: Props) {
  const { onLastWaveStart } = props;

  const colors = moodOptions.map(() => '');

  const waves = [...colors, ...colors.toReversed().slice(1, -1)];

  const handleWaveStart = (index: number) => {
    if (index === waves.length - 1) {
      onLastWaveStart?.();
    }
  };

  return (
    <div className={clsx(styles.circleContainer, 'absolute')}>
      {waves.map((wave, index) => (
        <LoaderWave
          onAnimationStart={() => handleWaveStart(index)}
          key={`${wave}-${index}`}
          style={{
            background: wave,
            animationDelay: `${DELAY_STEP * index}ms`,
          }}
        />
      ))}
    </div>
  );
}
