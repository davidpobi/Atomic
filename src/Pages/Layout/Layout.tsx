import React from 'react';
import './Layout.scss';
import Login from '../../Components/Auth/Login';
import { Outlet, Link } from "react-router-dom";

let title: string = 'GalleryX';

const Layout: React.FC = () => {
  return (
    <div className="App">
        <div className="header">
         <label className="title">{title}</label>

          {/* <ul className="ul-list-inline nav">
            <li className="list-inline-item nav-item">
              <Link to="/" className="navLink">Home</Link>
              </li>

              <li className="list-inline-item">
              <Link to="/assets" className="navLink">NFTs</Link>
              </li>

              <li className="list-inline-item">
              <Link to="/collection/0x2765b02b022b1e3cc84afef86d7a21c14b79cec4" className="navLink">Collections</Link>
              </li>
          </ul>
      
         <Login/> */}
        </div>

        <div className="main">
         <Outlet/>
        </div>
  </div>
  )
}

export default Layout;