import { EntityType } from '@/types';

export interface SignInArgs {
  nickName: string;
  password: string;
}

export interface SignUpArgs {
  avatarUrl?: string;
  code?: string;
  email?: string;
  language: string;
  nickName: string;
  password: string;
  registrationId?: string;
}

export interface UpdateProfileArgs {
  avatarUrl?: string;
  email?: string;
  language: string;
  nickName?: string;
  password?: string;
  passwordConfirmation?: string;
  previousPassword?: string;
}

export interface ComplainArgs {
  comment?: string;
  complaintType?: 'INAPPROPRIATE_CONTENT' | 'FRAUD' | 'SPAM' | 'OTHER';
  entityId: string;
  entityType: EntityType;
}
