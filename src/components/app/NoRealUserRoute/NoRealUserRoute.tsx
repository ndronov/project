import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { DEFAULT_ROUTE } from '@/common';
import { useCurrentUser } from '@/hooks';
import { PlugPage } from '@/pages';

export function NoRealUserRoute(props: PropsWithChildren) {
  const { children } = props;

  const { accessGranted, unknown, readOnly } = useCurrentUser();

  if (unknown) {
    return <PlugPage />;
  }

  if (accessGranted && !readOnly) {
    return <Navigate to={DEFAULT_ROUTE} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
