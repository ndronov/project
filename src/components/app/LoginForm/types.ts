import { FormProps } from '@/components';

export interface LoginFormValues {
  nickName?: string;
  password?: string;
}

export type UseLoginForm = FormProps<LoginFormValues>;
