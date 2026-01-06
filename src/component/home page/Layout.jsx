import React from "react";
import { Outlet } from "react-router-dom";
import HomePage from "./HomePage";
import "../../App.css"

function Layout() {
 return (
  <>
  <div className="w-full h-screen overflow-y-auto hide-scrollbar">
   <HomePage />
   <Outlet />
  </div>
  </>
 );
}

export default Layout;
