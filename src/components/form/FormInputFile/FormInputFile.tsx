import React, { useRef } from 'react';

import clsx from 'clsx';
import { useField } from 'formik';
import { Button, ButtonProps } from 'primereact/button';

import { FormInputFileErrorDialog } from '../FormInputFileErrorDialog';
import { isFieldInvalid, isFieldNonEmpty } from '../common';
import styles from './FormInputFile.module.css';

interface FormInputFileProps extends Omit<ButtonProps, 'icon' | 'onClick' | 'onChange'> {
  name: string;
  accept?: string[];
  emptyValueIcon?: string;
  nonEmptyValueIcon?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const defaultIcon = 'my-project-icon my-project-icon-paperclip';

export function FormInputFile(props: FormInputFileProps) {
  const {
    name,
    accept = [],
    className,
    emptyValueIcon = defaultIcon,
    nonEmptyValueIcon = defaultIcon,
    onChange,
    onClick,
    ...rest
  } = props;

  const [field, meta, helper] = useField<File | undefined>({ name });

  const isInvalid = isFieldInvalid(meta);

  const nonEmpty = isFieldNonEmpty(meta);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    const [file] = e.target.files ?? [];

    if (!file) return;

    const accepted = accept.includes(file.type);

    void helper.setValue(file);

    if (!accepted) {
      const errorMessage = file.type ? `File type ${file.type} is not supported` : 'Empty file type';
      throw new TypeError(errorMessage);
    }
  };

  const handleBlur = () => {
    const event = new FocusEvent('blur');
    const target = inputRef.current;

    field.onBlur({ ...event, target });
  };

  const handleClear = () => {
    void helper.setValue(undefined);
  };

  return (
    <>
      <Button
        className={clsx(className, isInvalid && styles.invalid)}
        icon={nonEmpty ? nonEmptyValueIcon : emptyValueIcon}
        onBlur={handleBlur}
        onClick={handleClick}
        tooltip={isInvalid ? meta.error : undefined}
        tooltipOptions={{
          position: 'bottom',
          event: 'both',
          className: styles.error,
        }}
        type="button"
        {...rest}
      />

      <input
        accept={accept.join()}
        className="hidden"
        id={name}
        name={name}
        onChange={handleChange}
        onClick={onClick}
        ref={inputRef}
        type="file"
      />

      <FormInputFileErrorDialog open={Boolean(meta.error)} onClose={handleClear} />
    </>
  );
}
