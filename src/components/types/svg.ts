import React from 'react';

export type SvgComponent = React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;
