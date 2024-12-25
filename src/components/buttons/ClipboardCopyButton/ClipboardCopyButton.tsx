import React, { useRef } from 'react';

import { Button, ButtonProps } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { TooltipEvent } from 'primereact/tooltip/tooltipoptions';

import { copyToClipboard } from '@/common';

interface Props
  extends Pick<
    ButtonProps,
    'children' | 'className' | 'icon' | 'iconPos' | 'id' | 'label' | 'outlined' | 'rounded' | 'size' | 'style' | 'text'
  > {
  tooltip: string;
  valueToCopy: string | (() => Promise<string | null>);
}

export function ClipboardCopyButton(props: Props) {
  const { id, tooltip, valueToCopy, ...rest } = props;

  const tooltipRef = useRef<Tooltip>(null);

  const copyText = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    const tooltipEvent = { currentTarget } as unknown as TooltipEvent;

    await copyToClipboard(valueToCopy);

    tooltipRef.current?.show(tooltipEvent);
  };

  return (
    <>
      <Button
        data-pr-hideevent="mouseleave"
        data-pr-position="bottom"
        data-pr-showevent="none"
        data-pr-tooltip={tooltip}
        id={id}
        onClick={copyText}
        type="button"
        {...rest}
      />

      <Tooltip target={`#${id}`} ref={tooltipRef} />
    </>
  );
}
