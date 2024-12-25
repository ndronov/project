import { Route, Routes } from 'react-router-dom';

import { ENTER_ROUTE, LOADER_ROUTE, REGISTRATION_ROUTE } from '@/common';
import { DefaultPageLayout, NoGuestRoute, NoRealUserRoute } from '@/components';
import { useCurrentUser } from '@/hooks';
import { EnterPage, LoaderPage, RegistrationPage } from '@/pages';

export function AppRoutes() {
  useCurrentUser({ prefetch: true });

  return (
    <Routes>
      {/* роуты для всех */}

      <Route path={LOADER_ROUTE} element={<LoaderPage />} />

      {/* роуты для гостя */}

      <Route
        path={ENTER_ROUTE}
        element={
          <NoRealUserRoute>
            <EnterPage />
          </NoRealUserRoute>
        }
      />

      <Route
        path={REGISTRATION_ROUTE}
        element={
          <NoRealUserRoute>
            <RegistrationPage />
          </NoRealUserRoute>
        }
      />

      {/* роуты для авторизованного реального юзера */}

      <Route
        path="/*"
        element={
          <NoGuestRoute>
            <DefaultPageLayout />
          </NoGuestRoute>
        }
      />
    </Routes>
  );
}
