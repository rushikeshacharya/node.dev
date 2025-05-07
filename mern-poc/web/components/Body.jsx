import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
