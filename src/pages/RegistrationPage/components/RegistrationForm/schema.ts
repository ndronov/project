import * as Yup from 'yup';

import { MAX_NICKNAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/common';

export const registrationFormSchema = Yup.object().shape({
  nickName: Yup.string().required('а никнейм?').max(MAX_NICKNAME_LENGTH, 'никнейм слишком длинный'),

  code: Yup.string(),

  email: Yup.string().email('какая-то неправильная почта'),

  password: Yup.string()
    .required('а пароль?')
    .min(MIN_PASSWORD_LENGTH, 'пароль слишком короткий')
    .max(MAX_PASSWORD_LENGTH, 'пароль слишком длинный'),

  passwordConfirmation: Yup.string().when('password', ([password]) => {
    const validValues = password ? [password] : [''];

    return Yup.string().default('').oneOf(validValues, 'пароли почему-то разные');
  }),
});
