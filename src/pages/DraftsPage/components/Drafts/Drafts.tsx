import clsx from 'clsx';
import { VirtualScroller } from 'primereact/virtualscroller';

import { TEMPLATE_HEIGHT } from '@/common';
import MagnifierIcon from '@/components/icons/magnifier.svg?react';
import { useLazyDrafts } from '@/hooks';
import { Draft, Nullable } from '@/types';

import { DraftTemplate } from '../DraftTemplate';
import styles from './Drafts.module.css';

export function Drafts() {
  const { lazyItems, onLazyLoad, emptyResults } = useLazyDrafts();

  if (emptyResults) {
    return (
      <div className="flex-1 flex flex-column justify-content-center align-items-center text-primary opacity-20">
        <MagnifierIcon className="w-10rem h-10rem" />

        <span className="w-20rem pt-4 text-center text-3xl line-height-1 font-semibold">ничего не найдено</span>
      </div>
    );
  }

  const draftTemplate = (draft: Nullable<Draft>) => <DraftTemplate draft={draft} />;

  return (
    <VirtualScroller
      appendOnly
      className={clsx('flex-1 my-project-no-scrollbar', styles.scroller)}
      itemSize={TEMPLATE_HEIGHT}
      itemTemplate={draftTemplate}
      items={lazyItems}
      lazy
      onLazyLoad={onLazyLoad}
      showLoader
    />
  );
}
