import { Button } from 'primereact/button';

import { useGoBack } from '@/hooks';

interface Props {
  className?: string;
}

export function GoBackButton(props: Props) {
  const { className } = props;

  const goBack = useGoBack();

  return (
    <Button
      className={className}
      icon="my-project-icon my-project-icon-times-light"
      onClick={goBack}
      rounded
      size="small"
      type="button"
    />
  );
}
