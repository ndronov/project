import React from 'react';

import { Skeleton } from 'primereact/skeleton';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  layout?: 'horizontal' | 'vertical';
}

export function LoadingTemplate(props: Props) {
  const { layout = 'vertical', className, style } = props;

  const width = layout === 'vertical' ? `${Math.random() * 100}%` : '100%';
  const height = layout === 'horizontal' ? `${Math.random() * 100}%` : '100%';

  return (
    <div className={className} style={style}>
      <Skeleton width={width} height={height} className="border-round-xl" />
    </div>
  );
}
