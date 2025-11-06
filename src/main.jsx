import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import ErrorBoundary from './comp/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('app')).render(
   <ErrorBoundary>
     <App />
   </ErrorBoundary>

);
