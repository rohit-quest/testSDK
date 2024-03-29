import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error('Root element with id "root" not found. Cannot render React app.');
  }
} else {
  console.error('The document object is not available. Cannot render React app.');
}
