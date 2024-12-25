import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { Button, ButtonProps } from 'primereact/button';

import styles from './LinkButton.module.css';

interface Props extends ButtonProps {
  buttonClassName?: string;
  href?: string;
  to?: string;
}
export function LinkButton(props: Props) {
  const { to, href, className, buttonClassName, ...restProps } = props;

  const linkClass = clsx(styles.link, className, 'flex no-underline outline-none');
  const button = <Button className={clsx(styles.button, buttonClassName, 'flex-1')} tabIndex={-1} {...restProps} />;

  if (to) {
    return (
      <Link className={linkClass} to={to}>
        {button}
      </Link>
    );
  }

  return (
    <a className={linkClass} href={href}>
      {button}
    </a>
  );
}
