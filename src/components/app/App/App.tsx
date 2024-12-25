import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import 'core-js/actual';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { AppRoutes } from '@/components';

import './fonts.css';
import './global.css';
import './icons.css';
import './primeflex-override.css';
import './primereact-override.css';
import './primereact-theme-override.css';
import './utility.css';
import './variables.css';

export function WrappedApp() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <PrimeReactProvider>
          <AppRoutes />
        </PrimeReactProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}
