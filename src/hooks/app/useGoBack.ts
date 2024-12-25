import { useNavigate } from 'react-router-dom';

import { DEFAULT_ROUTE } from '@/common';

export function useGoBack() {
  const navigate = useNavigate();

  return () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);

      return;
    }

    navigate(DEFAULT_ROUTE);
  };
}
