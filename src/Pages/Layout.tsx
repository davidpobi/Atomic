import React from 'react'
import Login from '../components/Auth/Login'
import { Outlet, Link } from "react-router-dom";

let title: string = 'Atomic';

const Layout: React.FC = () => {
  return (
    <div className="App">
        <div className="header">
        <ul className="ul-list-inline nav">
           <li className="list-inline-item nav-item">
             <Link to="/" className="navLink">Home</Link>
            </li>

            <li className="list-inline-item">
             <Link to="/assets" className="navLink">NFTs</Link>
            </li>
        </ul>
        <label className="title">{title}</label>
         <Login/>
        </div>

        <div className="main">
         <Outlet/>
        </div>
  </div>
  )
}

export default Layout