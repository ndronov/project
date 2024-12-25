import { FormProps } from '@/components';

export interface RegistrationFormValues {
  code?: string;
  email?: string;
  nickName?: string;
  password?: string;
}

export type UseRegistrationForm = FormProps<RegistrationFormValues>;
