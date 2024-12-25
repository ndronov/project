import clsx from 'clsx';
import { Menu } from 'primereact/menu';

import styles from './NavMenu.module.css';
import { useMainMenuItems } from './hooks';

export function NavMenu() {
  const mainMenuItems = useMainMenuItems();

  return (
    <nav
      className={clsx(styles.navMenuContainer, 'flex flex-column flex-shrink-0 align-self-start mt-4 mr-4 relative')}
    >
      <Menu model={mainMenuItems} className="w-full border-round-xl" />
    </nav>
  );
}
