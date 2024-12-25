import * as Yup from 'yup';

export const loginFormSchema = Yup.object().shape({
  nickName: Yup.string().required(''),
  password: Yup.string().required(''),
});
