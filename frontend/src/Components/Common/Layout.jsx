import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar className="w-full" />
      <div className="flex flex-grow">
        <Sidebar className="w-64 bg-gray-100" />
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
      <Footer className="w-full" />
    </div>
  );
};

export default Layout;

