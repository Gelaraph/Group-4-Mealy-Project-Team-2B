import React from "react";
import PropTypes from "prop-types";
// import AuthNavbar from "./authNavbar/AuthNavbar";
import Footer from "./Footer";
import Navbar from "./authNavbar/navbar/Navbar";

const Layout = ({ children }) => (
  <>
    {/* <AuthNavbar /> */}
    <Navbar />
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
