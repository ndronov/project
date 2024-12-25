import { UserReference } from '@/types';

export const NON_ORDINARY_USER_NAMES = [''];

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 22;
export const MAX_NICKNAME_LENGTH = 22;

export const TEMPLATE_HEIGHT = 52;

export function isNonOrdinaryUser(nickName: string = '') {
  return NON_ORDINARY_USER_NAMES.includes(nickName);
}

export function composeProfileLink(userId = '') {
  return `/${userId}`;
}

export function getProfileLink(user: Partial<UserReference>) {
  if (isNonOrdinaryUser(user.nickName)) return '';

  return composeProfileLink(user.id);
}
