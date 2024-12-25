import React, { useCallback, useEffect } from 'react';

import { Formik, FormikConfig, Form as FormikForm, FormikHelpers, FormikProps, FormikValues } from 'formik';

import { FormExtraProps, FormWrapperProps } from '@/components';

export function FormWrapper<Values>(props: FormWrapperProps<Values>) {
  const { children, className, id, onChange } = props;

  useEffect(() => {
    if (onChange) {
      onChange(props);
    }
  }, [onChange, props]);

  return (
    <FormikForm id={id} className={className}>
      {children}
    </FormikForm>
  );
}

export function Form<
  Values extends FormikValues = FormikValues,
  ExtraProps extends FormExtraProps<Values> = FormExtraProps<Values>,
>(props: FormikConfig<Values> & ExtraProps) {
  const { validateOnMount, initialValues, validationSchema, children, onSubmit, className, id, onChange } = props;

  const handleOnSubmit = useCallback(
    (values: Values, formikHelpers: FormikHelpers<Values>) => {
      void onSubmit(values, formikHelpers);
    },
    [onSubmit],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validateOnMount={validateOnMount}
      validationSchema={validationSchema}
    >
      {(formikProps: FormikProps<Values>) => (
        <FormWrapper className={className} id={id} onChange={onChange} {...formikProps}>
          {children as React.ReactNode}
        </FormWrapper>
      )}
    </Formik>
  );
}
