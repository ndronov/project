import { PropsWithChildren } from 'react';

import { RootContainer } from '@/components';

export function NoMenuLayout(props: PropsWithChildren) {
  const { children } = props;

  return <RootContainer>{children}</RootContainer>;
}
