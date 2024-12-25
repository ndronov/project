import { TEMPLATE_HEIGHT } from '@/common';
import { LoadingTemplate } from '@/components';

export function DraftLoadingTemplate() {
  return <LoadingTemplate style={{ height: TEMPLATE_HEIGHT, padding: '2px 0' }} />;
}
