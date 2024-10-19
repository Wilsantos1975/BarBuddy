import React from 'react';
import Sidebar from '../Components/Common/Sidebar';
import Footer from '../Components/Common/Footer';
import NavBar from '../Components/Common/NavBar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar className="w-full" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="w-64 flex-shrink-0" />
        <main className="flex-1 overflow-y-auto p-5 bg-white">
          {children}
        </main>
      </div>
      <Footer className="w-full" />
    </div>
  );
};

export default Layout;
