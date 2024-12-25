import clsx from 'clsx';

interface Props {
  htmlFor: string;
  isInvalid?: boolean;
  label: string;
}

export function FormLabel(props: Props) {
  const { htmlFor, isInvalid, label } = props;

  return (
    <label htmlFor={htmlFor} className={clsx('text-overflow-ellipsis', { 'p-error': isInvalid })}>
      {label}
    </label>
  );
}
