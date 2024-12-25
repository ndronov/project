import React, { useState } from 'react';

import { LoaderWaves } from './components';

interface Props {
  className?: string;
}

const DEFAULT_CLASS_NAME = 'fixed top-0 left-0 right-0 bottom-0 flex justify-content-center align-items-center';

const DELAY_STEP = 500;

export function Loader(props: Props) {
  const { className = DEFAULT_CLASS_NAME } = props;

  const [cascadeIds, setCascadeIds] = useState([0]);

  const handleLastWaveStart = () => {
    setTimeout(() => {
      setCascadeIds((ids) => [ids.at(-1) ?? 0, Date.now()]);
    }, DELAY_STEP);
  };

  return (
    <div className={className}>
      {cascadeIds.map((id) => (
        <LoaderWaves onLastWaveStart={handleLastWaveStart} key={id} />
      ))}
    </div>
  );
}
