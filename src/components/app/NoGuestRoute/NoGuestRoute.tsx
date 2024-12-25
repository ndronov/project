import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ENTER_ROUTE } from '@/common';
import { useCurrentUser } from '@/hooks';
import { PlugPage } from '@/pages';

export function NoGuestRoute(props: PropsWithChildren) {
  const { children } = props;

  const { accessGranted, unknown } = useCurrentUser();

  if (unknown) {
    return <PlugPage />;
  }

  if (!accessGranted) {
    return <Navigate to={ENTER_ROUTE} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
