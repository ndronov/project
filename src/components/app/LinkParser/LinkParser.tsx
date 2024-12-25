import Linkify from 'linkify-react';
import { Opts } from 'linkifyjs';

import { stopPropagation } from '@/common';

import styles from './LinkParser.module.css';

const options: Opts = {
  truncate: 100,
  className: styles.link,
  defaultProtocol: 'https',
  target: {
    url: '_blank',
  },
  attributes: {
    onClick: stopPropagation,
  },
};

interface Props {
  className?: string;
  text?: string;
}

export function LinkParser(props: Props) {
  const { className, text } = props;

  if (!text) return null;

  return (
    <Linkify as="span" className={className} options={options}>
      {text}
    </Linkify>
  );
}
