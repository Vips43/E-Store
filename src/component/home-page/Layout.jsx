import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "../../App.css"

function Layout() {
 return (
  <>
  <div className="w-full h-screen overflow-y-auto hide-scrollbar">
   <NavBar />
   <Outlet />
  </div>
  </>
 );
}

export default Layout;
