import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Fn } from '@/types';

interface Props {
  onClose: Fn;
  open?: boolean;
}

export function FormInputFileErrorDialog(props: Props) {
  const { onClose, open } = props;

  const header = (
    <header className="flex justify-content-end">
      <Button icon="my-project-icon my-project-icon-times-light" onClick={onClose} rounded size="small" type="button" />
    </header>
  );

  const footer = (
    <footer className="flex justify-content-center">
      <Button label="выбрать картинку" rounded onClick={onClose} />
    </footer>
  );

  return (
    <Dialog
      className="bg-white"
      closable={false}
      contentClassName="mx-4"
      draggable={false}
      footer={footer}
      header={header}
      headerClassName="pb-0"
      onHide={() => {}}
      resizable={false}
      visible={open}
    >
      <h1 className="text-5xl line-height-1 m-0 font-semibold">неверный формат</h1>
      <div className="mt-4">
        Увы, но пока что мы поддерживаем не все возможные форматы изображений. Ты можешь прикрепить картинку форматов
        JPG или PNG.
      </div>
    </Dialog>
  );
}
