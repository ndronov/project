import { RawUserReferencesData, UserReferencesData, getUrlSearchParam } from '@/api';
import { LazyUserReferenceData, UserReferencesMap } from '@/types';

export function mapToUserReferences(users: UserReferencesMap) {
  return Object.values(users);
}

export function matToUserReferencesData(data: UserReferencesData): LazyUserReferenceData {
  const { blacklists } = data;

  const after = getUrlSearchParam(data.meta.paging.nextPageUrl, 'after');
  const users = mapToUserReferences(data.users);

  return {
    after,
    users,
    blacklists,
  };
}

export function mapToFollowUsersData(data: RawUserReferencesData): LazyUserReferenceData {
  const after = getUrlSearchParam(data.meta.paging.nextPageUrl, 'after');
  const users = mapToUserReferences(data.users);

  return {
    after,
    users,
  };
}
