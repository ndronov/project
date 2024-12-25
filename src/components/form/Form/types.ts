import { PropsWithChildren } from 'react';

import { FormikHelpers, FormikProps } from 'formik';

export interface FormExtraProps<Values> {
  className?: string;
  id?: string;
  onChange?: (formikProps: FormikProps<Values>) => void;
}

export type FormWrapperProps<T> = PropsWithChildren<FormExtraProps<T> & FormikProps<T>>;

export interface FormProps<Values> {
  initialValues: Values;
  validationSchema: unknown;

  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => void | Promise<unknown>;

  onChange?: (formikProps: FormikProps<Values>) => void;
}
