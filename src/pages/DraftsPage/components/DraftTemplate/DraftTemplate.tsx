import clsx from 'clsx';

import { TEMPLATE_HEIGHT, getProfileLink } from '@/common';
import { CustomLink, DraftLoadingTemplate } from '@/components';
import { Draft, Nullable } from '@/types';

import styles from './DraftTemplate.module.css';

interface Props {
  draft: Nullable<Draft>;
}

export function DraftTemplate(props: Props) {
  const { draft } = props;

  if (!draft) {
    return <DraftLoadingTemplate />;
  }

  const profileLink = getProfileLink(draft);

  return (
    <CustomLink className={clsx('flex', styles.container)} style={{ height: TEMPLATE_HEIGHT }} to={profileLink}>
      <div className="w-full px-3 flex justify-content-between align-items-center bg-white border-round-xl">
        <div className="flex-1 white-space-nowrap overflow-hidden text-overflow-ellipsis">{draft.nickName}</div>

        <div className="flex flex-column align-items-end ml-1">
          <div className="text-xs line-height-1">{draft.place}</div>
        </div>
      </div>
    </CustomLink>
  );
}
