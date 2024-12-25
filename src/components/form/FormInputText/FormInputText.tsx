import React from 'react';

import clsx from 'clsx';
import { useField } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext';

import { SvgComponent } from '@/components';

import { FormLabel } from '../FormLabel';
import { InputIcon } from '../InputIcon';
import { isFieldInvalid } from '../common';
import styles from './FormInputText.module.css';

interface Props extends Omit<InputTextProps, 'required'> {
  button?: React.ReactNode;
  icon?: string | SvgComponent;
  label: string;
  name: string;
  buttonPosition?: 'left' | 'right';
}

const buttonPositionClassMap = new Map<string, string>([
  ['left', styles.buttonLeft],
  ['right', styles.buttonRight],
]);

export function FormInputText(props: Props) {
  const { button, buttonPosition = 'right', className, icon, label, name, ...rest } = props;

  const [field, meta] = useField<string>({ name });

  const isInvalid = isFieldInvalid(meta);

  const buttonLeft = Boolean(button && buttonPosition === 'left');
  const labelClass = clsx('p-float-label', { 'p-input-icon-left': icon }, buttonLeft && styles.floatLabelButtonLeft);
  const inputClass = clsx({ 'p-invalid': isInvalid }, buttonLeft && styles.inputButtonLeft);
  const buttonClass = clsx(styles.button, buttonPositionClassMap.get(buttonPosition));

  return (
    <div className={className}>
      <span className={labelClass}>
        <InputIcon icon={icon} />

        <InputText
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

        {button && <div className={buttonClass}>{button}</div>}

        <FormLabel htmlFor={name} label={label} isInvalid={isInvalid} />
      </span>
    </div>
  );
}
