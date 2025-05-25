import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'

function initApp() {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      root
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
