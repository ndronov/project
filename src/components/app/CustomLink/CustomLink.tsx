import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

type Props = React.ComponentProps<typeof Link>;

export function CustomLink(props: Props) {
  const { to, className, ...restProps } = props;

  return <Link className={clsx(className, { 'pointer-events-none': !to })} to={to || '/'} {...restProps} />;
}
