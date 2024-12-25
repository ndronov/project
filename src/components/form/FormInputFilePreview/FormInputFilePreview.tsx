import React from 'react';

import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';
import { Button } from 'primereact/button';

import { deleteTempUrlObject, grabImageFilePath } from '@/common';
import TimesIcon from '@/components/icons/times.svg?react';

import styles from './FormInputFilePreview.module.css';

interface Props {
  className?: string;
  imageClassName?: string;
  buttonClassName?: string;
  fieldName?: string;
}

export function FormInputFilePreview(props: Props) {
  const { className, imageClassName, buttonClassName, fieldName = 'image' } = props;

  const [imageField] = useField<File | undefined>({ name: fieldName });

  const image = imageField.value;

  const { setFieldValue } = useFormikContext();

  const clearField = () => {
    void setFieldValue('image', undefined);
  };

  if (!image) return null;

  return (
    <div className={clsx('relative', className)}>
      <img alt="" className={imageClassName} onError={grabImageFilePath(image)} onLoad={deleteTempUrlObject} src="" />

      <Button
        onClick={clearField}
        outlined
        rounded
        type="button"
        className={clsx('absolute p-0 border-none', styles.button, buttonClassName)}
      >
        <TimesIcon className={styles.icon} />
      </Button>
    </div>
  );
}
