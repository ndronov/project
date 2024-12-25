import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import styles from './RootContainer.module.css';

export function RootContainer(props: PropsWithChildren) {
  const { children } = props;

  return <div className={clsx('h-screen flex relative', styles.container)}>{children}</div>;
}
