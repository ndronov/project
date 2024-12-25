import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { UseFetchDataArgs, getSomeUserReferenceApi } from '@/api';
import { isNonOrdinaryUser } from '@/common';
import { useCurrentUser } from '@/hooks';
import { someUserReferenceState } from '@/stores';

export function useSomeUserReference(args: UseFetchDataArgs = {}) {
  const { prefetch = false } = args;

  const { id = '' } = useParams();

  const [user, setUser] = useRecoilState(someUserReferenceState);
  const clearUser = useResetRecoilState(someUserReferenceState);

  const isForbidden = isNonOrdinaryUser(user?.nickName);

  const { user: currentUser, readOnly } = useCurrentUser();

  const fetchUser = useCallback(async () => {
    clearUser();

    const response = await getSomeUserReferenceApi(id);

    if (!response.success) return;

    setUser(response.data);
  }, [clearUser, id, setUser]);

  useEffect(() => {
    if (prefetch && id) void fetchUser();
  }, [fetchUser, id, prefetch]);

  return {
    fetchUser,
    haveNewMessages: false,
    isCurrentUser: id === currentUser?.id,
    isForbidden,
    readOnly,
    setUser,
    user: isForbidden ? null : user,
    userId: id,
  };
}
