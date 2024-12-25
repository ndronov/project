import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import { signInApi } from '@/api';
import { DEFAULT_ROUTE } from '@/common';
import { useCurrentUser } from '@/hooks';

import { loginFormSchema } from './schema';
import { LoginFormValues, UseLoginForm } from './types';

const initialValues = {
  nickName: undefined,
  password: undefined,
};

export function useLoginForm(): UseLoginForm {
  const navigate = useNavigate();

  const { fetchUser } = useCurrentUser();

  const onSubmit = useCallback(
    async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
      const { nickName = '', password = '' } = values;

      const response = await signInApi({ nickName, password });

      helpers.setSubmitting(false);

      if (!response.success) {
        helpers.setErrors(response.formErrors ?? {});

        return;
      }

      await fetchUser();

      navigate(DEFAULT_ROUTE);
    },
    [fetchUser, navigate],
  );

  return {
    initialValues,
    onSubmit,
    validationSchema: loginFormSchema,
  };
}
