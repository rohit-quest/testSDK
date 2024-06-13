import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ReferEarn } from './components/Refer/ReferEarn';
import ReferEarnPreview from './components/expansion/Preview';
// ReferEarn
// ReferEarnPreview

if (typeof document !== 'undefined') {
    const rootElement = document.getElementById('root');
    console.log(rootElement)
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<ReferEarnPreview />);
    } else {
        console.error('Root element with id "root" not found. Cannot render React app.');
    }
} else {
    console.error('The document object is not available. Cannot render React app.');
}
