import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from './Components/Layout/PublicLayout';
import DashboardLayout from './Components/Layout/DashboardLayout';

// Import all page components
import LandingHero from './Components/HomeComponents/LandingHero';
import About from './Pages/About';
import Features from './Pages/Features';
import Login from '../src/Auth/Login';
import Register from '../src/Auth/Register';
import Dashboard from './Components/Dashboard';
import BatchCalculator from './Components/BatchCalculator';
import EventWizard from './Components/EventWizard';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingHero />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/batch-calculator" element={<BatchCalculator />} />
        <Route path="/event-wizard" element={<EventWizard />} />
      </Route>
    </Routes>
  );
}

export default App;
