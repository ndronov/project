import { useFormikContext } from 'formik';
import { Button } from 'primereact/button';

interface Props {
  className?: string;
  label: string;
  touchedOnly?: boolean;
  validOnly?: boolean;
}

export function FormSubmit(props: Props) {
  const { className, label, touchedOnly, validOnly } = props;

  const { dirty, isSubmitting, isValid } = useFormikContext();

  const disabled = (!isValid && validOnly) || (!dirty && touchedOnly) || isSubmitting;

  return <Button className={className} disabled={disabled} label={label} rounded type="submit" />;
}
