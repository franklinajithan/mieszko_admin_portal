import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import App from './App';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';




const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>
    </React.StrictMode>
  );
} else {
  console.error("Unable to find root element with id 'root'");
}

function logWebVitals(metric: any) {
 // console.log(metric);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(logWebVitals);
