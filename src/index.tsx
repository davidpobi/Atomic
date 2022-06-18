import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl="https://hzznegusqz14.usemoralis.com:2053/server" appId="4WkNtOvdqLbJXOxYV3obuGU3WhzbrJ6xQzUkAtWY">
    <App />
    </MoralisProvider>
  </React.StrictMode>
);