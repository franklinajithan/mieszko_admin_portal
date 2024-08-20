import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css'
import App from './App';
import i18n from "./i18n";
import { I18nextProvider } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=IBM+Plex+Serif:wght@400;700&display=swap');

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
    <I18nextProvider i18n={i18n}>
      {/* <GlobalStyle /> */}
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
