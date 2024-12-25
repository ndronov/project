import React from 'react';
import ReactDOM from 'react-dom/client';

import { WrappedApp } from '@/components';

const container = document.getElementById('project');

const root = container ? ReactDOM.createRoot(container) : null;

root?.render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>,
);
