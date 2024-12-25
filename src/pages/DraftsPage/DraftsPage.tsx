import { useUnmountEffect } from 'primereact/hooks';

import { MainContainer } from '@/components';
import { useLazyDrafts } from '@/hooks';

import { DraftSearchInput, Drafts } from './components';

export function DraftsPage() {
  const { clearData, nickNameDebounced } = useLazyDrafts();

  useUnmountEffect(clearData);

  return (
    <MainContainer>
      <div className="h-full p-4 my-project-no-scrollbar">
        <div className="min-h-full flex flex-column">
          <h3 className="font-medium text-xl line-height-1 m-0 align-self-center">Черновики</h3>

          <DraftSearchInput />

          <Drafts key={nickNameDebounced} />
        </div>
      </div>
    </MainContainer>
  );
}
