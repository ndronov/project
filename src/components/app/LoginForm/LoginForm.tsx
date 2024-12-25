import React from 'react';

import clsx from 'clsx';

import { Form, FormInputPassword, FormInputText, FormSubmit } from '@/components';

import styles from './LoginForm.module.css';
import { useLoginForm } from './useLoginForm';

export function LoginForm() {
  const formProps = useLoginForm();

  return (
    <Form className={clsx('p-fluid flex flex-column mt-4', styles.form)} {...formProps}>
      <FormInputText label="логин" name="nickName" />

      <FormInputPassword className="mt-1" label="пароль" name="password" />

      <FormSubmit className={clsx('mt-4 align-self-center', styles.submit)} label="войти" validOnly />
    </Form>
  );
}
