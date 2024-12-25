import { useLocation, useNavigate } from 'react-router-dom';

import { getMainMenuItems } from './logic';

export function useMainMenuItems() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return getMainMenuItems(navigate, pathname);
}
