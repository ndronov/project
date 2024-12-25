import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import styles from './AdditionalContainer.module.css';

export function AdditionalContainer(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className={clsx('p-4 ml-4 my-4 flex flex-column flex-shrink-0 border-round-xl relative', styles.container)}>
      {children}
    </div>
  );
}
