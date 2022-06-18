import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import App from './App';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoralisProvider } from "react-moralis";
import Collectibles from './Pages/Collectibles';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import NoMatch from './Pages/NoMatch';
import allReducers from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const window:any = Window;
// //  STORE
let store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


// // DISPLAY
store.subscribe(() => {
 console.log(store.getState());
});



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