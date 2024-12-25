import React from 'react';

import clsx from 'clsx';

import { Form, FormInputNickname, FormInputPassword, FormSubmit } from '@/components';

import styles from './RegistrationForm.module.css';
import { useRegistrationForm } from './useRegistrationForm';

export function RegistrationForm() {
  const formProps = useRegistrationForm();

  return (
    <Form className={clsx('p-fluid flex flex-column mt-4', styles.form)} validateOnMount {...formProps}>
      <FormInputNickname />

      <FormInputPassword label="пароль" name="password" className="mt-1" />

      <FormInputPassword label="повтори пароль" name="passwordConfirmation" className="mt-1" />

      <FormSubmit className={clsx('mt-4 align-self-center', styles.submit)} label="зарегистрироваться" touchedOnly />
    </Form>
  );
}
