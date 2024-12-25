export interface GetRawUserReferencesArgs {
  userId: string;
  after?: string;
  limit?: number;
}

export interface GetUserReferencesArgs {
  after?: string;
  limit?: number;
}
