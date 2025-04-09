import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import AppToast from "../Toast/AppToast";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <AppToast />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
