import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';
import { Button } from 'primereact/button';

import { useMainContainer } from '@/hooks';

import styles from './MainContainer.module.css';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export function MainContainer(props: PropsWithChildren<Props>) {
  const { children, className, style } = props;

  const { onTop, scrollToTop, containerRef, handleScroll } = useMainContainer();

  return (
    <>
      <div
        className={clsx(styles.mainContainer, className, 'my-4 flex-shrink-0 overflow-hidden border-round-xl relative')}
        onScroll={handleScroll}
        ref={containerRef}
        style={style}
      >
        {children}
      </div>

      {!onTop && (
        <Button
          icon="my-project-icon my-project-icon-up"
          rounded
          outlined
          type="button"
          className={clsx('fixed border-none', styles.scrollToTopButton)}
          onClick={scrollToTop}
        />
      )}
    </>
  );
}
