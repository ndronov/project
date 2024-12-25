import type { UserReference } from '../userReferences';

export interface CurrentUser extends UserReference {
  email?: string;
  readOnlyUser?: boolean;
}

export interface Invite {
  code: string;
  link: string;
}

export interface SyncAttrs {
  link: string;
  token: string;
}
