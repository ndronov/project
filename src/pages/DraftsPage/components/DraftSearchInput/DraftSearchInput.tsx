import React from 'react';

import { InputText } from 'primereact/inputtext';

import { MAX_NICKNAME_LENGTH } from '@/common';
import { useLazyDrafts } from '@/hooks';

export function DraftSearchInput() {
  const { setNickName, nickName } = useLazyDrafts();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <div className="p-input-icon-left mt-4">
      <i className="my-project-icon my-project-icon-magnifier opacity-20" />

      <InputText
        className="w-full"
        maxLength={MAX_NICKNAME_LENGTH}
        onChange={handleChange}
        placeholder="Введите имя черновика"
        value={nickName}
      />
    </div>
  );
}
