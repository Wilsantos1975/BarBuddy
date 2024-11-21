import React from 'react';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import NavBar from '../Common/NavBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
