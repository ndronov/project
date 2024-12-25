import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ENTER_ROUTE } from '@/common';
import { useCurrentUser } from '@/hooks';
import { PlugPage } from '@/pages';

export function RealUserOnlyRoute(props: PropsWithChildren) {
  const { children } = props;

  const { accessGranted, unknown, readOnly } = useCurrentUser();

  if (unknown || !accessGranted) {
    return <PlugPage />;
  }

  if (readOnly) {
    return <Navigate to={ENTER_ROUTE} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
