import React from "react";
import NavBar from "../Common/NavBar";
import Footer from "../Common/Footer";
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
