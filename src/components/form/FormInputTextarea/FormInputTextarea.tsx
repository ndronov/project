import React from 'react';

import clsx from 'clsx';
import { useField } from 'formik';
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea';

import { SvgComponent } from '@/components';

import { FormLabel } from '../FormLabel';
import { InputIcon } from '../InputIcon';
import { isFieldInvalid } from '../common';
import styles from './FormInputTextarea.module.css';

interface Props extends Omit<InputTextareaProps, 'required'> {
  button?: React.ReactNode;
  buttonPosition?: 'left' | 'right';
  icon?: string | SvgComponent;
  inputClassName?: string;
  label: string;
  name: string;
}

const buttonPositionClassMap = new Map<string, string>([
  ['left', styles.buttonLeft],
  ['right', styles.buttonRight],
]);

export function FormInputTextarea(props: Props) {
  const { button, buttonPosition = 'right', inputClassName, className, icon, label, name, ...rest } = props;

  const [field, meta] = useField<string>({ name });

  const isInvalid = isFieldInvalid(meta);

  const buttonLeft = Boolean(button && buttonPosition === 'left');
  const labelClass = clsx(
    'p-float-label h-full overflow-hidden border-round-xl',
    { 'p-input-icon-left': icon },
    buttonLeft && styles.floatLabelButtonLeft,
  );
  const inputClass = clsx(
    { 'p-invalid': isInvalid },
    inputClassName,
    'block overflow-y-auto my-project-custom-scrollbar',
    buttonLeft && styles.inputButtonLeft,
  );
  const buttonClass = clsx(styles.button, buttonPositionClassMap.get(buttonPosition));

  return (
    <div className={className}>
      <span className={labelClass}>
        <InputIcon icon={icon} />

        {buttonLeft && <div className={buttonClass}>{button}</div>}

        <InputTextarea
          className={inputClass}
          id={name}
          name={name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          value={field.value ?? ''}
          tooltip={isInvalid ? meta.error : undefined}
          tooltipOptions={{
            className: styles.error,
            event: 'both',
            position: 'bottom',
          }}
          {...rest}
        />

        <FormLabel htmlFor={name} label={label} isInvalid={isInvalid} />
      </span>
    </div>
  );
}
