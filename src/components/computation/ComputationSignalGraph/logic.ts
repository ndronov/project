import clsx from 'clsx';

import { TimeSpan } from '@/types';

import styles from './EmotionGraph.module.css';

const tabMenuItemClass = clsx('flex-1 flex justify-content-center', styles.tabMenuItem);

export const tabMenuModel = [
  { label: '1д', id: TimeSpan.Day, className: tabMenuItemClass },
  { label: '1н', id: TimeSpan.Week, className: tabMenuItemClass },
  { label: '1м', id: TimeSpan.Month, className: tabMenuItemClass },
  { label: '1г', id: TimeSpan.Year, className: tabMenuItemClass },
  { label: 'весь', id: TimeSpan.Whole, className: tabMenuItemClass },
];
