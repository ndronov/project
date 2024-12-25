import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FormikHelpers } from 'formik';

import { signUpApi } from '@/api';
import { DEFAULT_ROUTE } from '@/common';
import { useCurrentUser } from '@/hooks';

import { registrationFormSchema } from './schema';
import { RegistrationFormValues, UseRegistrationForm } from './types';

const emptyFormValues = {
  code: undefined,
  email: undefined,
  nickName: undefined,
  password: undefined,
  passwordConfirmation: undefined,
};

export function useRegistrationForm(): UseRegistrationForm {
  const [searchParams] = useSearchParams();

  const inviteCode = searchParams.get('code') ?? undefined;

  const initialValues = useMemo(
    () => ({
      ...emptyFormValues,
      code: inviteCode,
    }),
    [inviteCode],
  );

  const navigate = useNavigate();

  const { fetchUser } = useCurrentUser();

  const onSubmit = useCallback(
    async (values: RegistrationFormValues, helpers: FormikHelpers<RegistrationFormValues>) => {
      const { code, email, nickName = '', password = '' } = values;

      const args = {
        code,
        email,
        language: 'ru',
        nickName,
        password,
      };

      const response = await signUpApi(args);

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
    validationSchema: registrationFormSchema,
  };
}
