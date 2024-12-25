import clsx from 'clsx';
import { Divider } from 'primereact/divider';

import { ENTER_ROUTE } from '@/common';
import { LinkButton, NoMenuLayout } from '@/components';

import styles from './RegistrationPage.module.css';
import { RegistrationForm } from './components';

export function RegistrationPage() {
  return (
    <NoMenuLayout>
      <div className="flex-1 flex justify-content-center align-items-stretch py-4 relative">
        <div
          className={clsx(
            'flex flex-column flex-shrink-0 align-items-center border-round-xl bg-white my-project-no-scrollbar',
            styles.modal,
          )}
        >
          <div className="flex-1" />

          <h2 className="line-height-1 font-semibold text-5xl mt-4 mb-0">регистрация</h2>

          <div className="flex-1" />

          <RegistrationForm />

          <div className="flex-1" />

          <Divider layout="horizontal" type="solid" className={styles.divider} />

          <div className="flex-1" />

          <LinkButton className="mt-4" to={ENTER_ROUTE} label="войти" outlined rounded type="button" />

          <div className="flex-1" />

          <span className="mt-4">Нет приложения? Скачай здесь:</span>
        </div>
      </div>
    </NoMenuLayout>
  );
}
