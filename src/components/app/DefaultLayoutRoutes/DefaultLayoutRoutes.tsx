import { Navigate, Route, Routes } from 'react-router-dom';

import { COMPUTATION_SIGNAL_ROUTE_WITH_ID, DEFAULT_ROUTE, DRAFTS_ROUTE } from '@/common';
import { ComputationSignalPage, DraftsPage } from '@/pages';

export function DefaultLayoutRoutes() {
  return (
    <Routes>
      <Route path={COMPUTATION_SIGNAL_ROUTE_WITH_ID} element={<ComputationSignalPage />} />

      <Route path={DRAFTS_ROUTE} element={<DraftsPage />} />

      <Route path="*" element={<Navigate to={DEFAULT_ROUTE} replace />} />
    </Routes>
  );
}
