import { NavigateFunction } from 'react-router-dom';

import clsx from 'clsx';
import { MenuItemCommandEvent } from 'primereact/menuitem';

import { DRAFTS_ROUTE } from '@/common';

import styles from '../../NavMenu.module.css';

export function isActiveItem(pathname: string, itemUrl: string) {
  if (pathname === '/') {
    return itemUrl === '/';
  }

  return itemUrl.startsWith(pathname);
}

export function getMainMenuItems(navigate: NavigateFunction, pathname: string) {
  function command(event: MenuItemCommandEvent) {
    event.originalEvent.preventDefault();

    navigate(event.item.url ?? '');
  }

  const mainMenuItems = [
    {
      label: 'черновики',
      icon: 'pi-fw my-project-icon my-project-icon-wine-glass',
      url: DRAFTS_ROUTE,
    },
  ];

  return mainMenuItems.map((item) => {
    const isActive = isActiveItem(pathname, item.url);

    return {
      ...item,
      command,
      className: clsx(isActive ? styles.activeItem : null),
      disabled: isActive,
    };
  });
}
