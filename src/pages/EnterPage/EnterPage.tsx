import clsx from 'clsx';
import { Divider } from 'primereact/divider';

import { REGISTRATION_ROUTE } from '@/common';
import { LinkButton, LoginForm, NoMenuLayout } from '@/components';

import styles from './EnterPage.module.css';

export function EnterPage() {
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

          <div className={clsx('flex align-items-center', styles.header)} />

          <div className="flex-1" />

          <h2 className="line-height-1 font-semibold text-5xl mt-4 mb-0">вход</h2>

          <div className="flex-1" />

          <LoginForm />

          <div className="flex-1" />

          <Divider layout="horizontal" type="solid" className={styles.divider} />

          <div className="flex-1" />

          <div className="flex justify-content-center mt-4">
            <LinkButton
              className="mr-4"
              to={REGISTRATION_ROUTE}
              label="зарегистрироваться"
              outlined
              rounded
              type="button"
            />
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </NoMenuLayout>
  );
}
