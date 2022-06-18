import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import Collectibles from './Pages/Collectibles';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import NoMatch from './Pages/NoMatch';
import {Provider} from 'react-redux';
import store from './redux/store';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
    // <React.StrictMode></React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <MoralisProvider serverUrl="https://hzznegusqz14.usemoralis.com:2053/server" appId="4WkNtOvdqLbJXOxYV3obuGU3WhzbrJ6xQzUkAtWY">
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="assets" element={<Collectibles />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
    </MoralisProvider>
    </BrowserRouter>
    </Provider>
);