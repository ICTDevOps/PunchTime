import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

function initApp() {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
