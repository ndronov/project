import { useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { HttpStatusCode } from 'axios';

import { UseFetchDataArgs, getCurrentUserApi } from '@/api';
import { currentUserAuthStatusState, currentUserState } from '@/stores';
import { AuthStatus } from '@/types';

export function useCurrentUser(args: UseFetchDataArgs = {}) {
  const { prefetch = false } = args;

  const [user, setUser] = useRecoilState(currentUserState);

  const [authStatus, setAuthStatus] = useRecoilState(currentUserAuthStatusState);

  const unknown = authStatus === AuthStatus.Unknown;
  const readOnly = authStatus === AuthStatus.ReadOnly;
  const readOnlyTimeLimitReached = authStatus === AuthStatus.ReadOnlyTimeLimitReached;
  const accessGranted = [AuthStatus.Authorized, AuthStatus.ReadOnly].includes(authStatus);

  const fetchUser = useCallback(async () => {
    setAuthStatus(AuthStatus.Unknown);

    const response = await getCurrentUserApi();

    if (!response.success && response.canceled) return;

    if (!response.success) {
      const newAuthStatus =
        response.code === HttpStatusCode.RangeNotSatisfiable
          ? AuthStatus.ReadOnlyTimeLimitReached
          : AuthStatus.NonAuthorized;

      setAuthStatus(newAuthStatus);

      return;
    }

    const newUser = response.data;
    setUser(newUser);

    const newAuthStatus = newUser?.readOnlyUser ? AuthStatus.ReadOnly : AuthStatus.Authorized;
    setAuthStatus(newAuthStatus);
  }, [setAuthStatus, setUser]);

  useEffect(() => {
    if (prefetch) void fetchUser();
  }, [fetchUser, prefetch]);

  return {
    accessGranted,
    fetchUser,
    readOnly,
    readOnlyTimeLimitReached,
    unknown,
    user,
  };
}
