import React, { useState } from 'react';

import { Button } from 'primereact/button';

import { FormInputText } from '@/components';

interface Props {
  className?: string;
  label: string;
  name: string;
}

export function FormInputPassword(props: Props) {
  const { className, label, name } = props;

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((currentOpen) => !currentOpen);
  };

  return (
    <FormInputText
      button={
        <Button
          icon={open ? 'my-project-icon my-project-icon-closed-eye-light' : 'my-project-icon my-project-icon-open-eye'}
          onClick={toggle}
          outlined={!open}
          rounded
          size="small"
          type="button"
        />
      }
      className={className}
      label={label}
      name={name}
      type={open ? 'text' : 'password'}
    />
  );
}
