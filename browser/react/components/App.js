import React from 'react';
import Navbar from './navbar/NavbarContainer';
import Footer from './Footer';

export default ({ children }) => (
  <div id="main" className="container-fluid">
    <Navbar />
    { children }
    <Footer />
  </div>
);