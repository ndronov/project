import { DefaultLayoutRoutes, NavMenu, RootContainer } from '@/components';

import styles from './DefaultPageLayout.module.css';

export function DefaultPageLayout() {
  return (
    <RootContainer>
      <div className={styles.gap} />

      <>
        <NavMenu />

        <DefaultLayoutRoutes />
      </>
    </RootContainer>
  );
}
