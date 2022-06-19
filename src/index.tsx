import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import Collectibles from './Pages/Collectibles';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import NoMatch from './Pages/NoMatch';
import {Provider} from 'react-redux';
import store from './Redux/store';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRouteProps } from './Models/interfaces';
import { AuthGuard } from './Services/AuthGuard';


const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/",
};

 


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
      <Route path="assets" element={ <AuthGuard
              {...defaultProtectedRouteProps}
              outlet={<Collectibles />}
            />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
    </MoralisProvider>
    </BrowserRouter>
    </Provider>
);