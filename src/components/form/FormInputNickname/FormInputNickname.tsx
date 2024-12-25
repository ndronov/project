import { useFormikContext } from 'formik';
import { Button } from 'primereact/button';

import { useNicknameSuggestions } from '@/hooks';

import { FormInputText } from '../FormInputText';

interface Props {
  className?: string;
  label?: string;
  name?: string;
}

export function FormInputNickname(props: Props) {
  const { className, label = 'никнейм', name = 'nickName' } = props;

  const suggestNickname = useNicknameSuggestions();

  const { setFieldValue } = useFormikContext();

  const onSuggest = async () => {
    const nickName = await suggestNickname();

    if (!nickName) return;

    void setFieldValue(name, nickName);
  };

  return (
    <FormInputText
      button={
        <Button
          icon="my-project-icon my-project-icon-wand"
          onClick={onSuggest}
          outlined
          rounded
          size="small"
          type="button"
        />
      }
      className={className}
      label={label}
      name={name}
    />
  );
}
