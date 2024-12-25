import { DraftsData, getUrlSearchParam } from '@/api';

export function mapToLazyDraftsData(data: DraftsData) {
  const { drafts } = data;

  const after = getUrlSearchParam(data.meta.paging.nextPageUrl, 'after');

  return {
    after,
    drafts,
  };
}
