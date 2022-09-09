import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";

let title: string = "Atomic";

const Layout: React.FC = () => {
  return (
    <div className="App">
      <div className="header">
        <label className="title">{title}</label>

        {/* <Login/> */}
      </div>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
