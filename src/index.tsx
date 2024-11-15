import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';
import store, { persistor } from './store';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        // console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        // console.error('Service Worker registration failed:', error);
      });
  });
}

// Check if browser supports notifications
if (!('Notification' in window)) {
  // console.log('This browser does not support desktop notification');
} else {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      // console.log('Notification permission granted.');
    } else if (permission === 'denied') {
      // console.log('Notification permission denied.');
    }
  });
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'IBM Plex Serif', serif;
  }
`;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <GlobalStyle />
          <App />
        </I18nextProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Unable to find root element with id 'root'");
}

function logWebVitals(metric:any) {
  // console.log(metric);
}

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(logWebVitals);
