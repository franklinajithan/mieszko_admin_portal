import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import App from './App';
import global_en from "./translations/en/global.json"
import global_pl from "./translations/pl/global.json"
import global_ta from "./translations/ta/global.json"
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation:{escapeValue:false},
  lng:"en",
  resources:{
    en:{global:global_en},
    pl:{global:global_pl},
    ta:{global:global_ta}
  }
})


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
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
