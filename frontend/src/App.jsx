import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from './Components/Layout/PublicLayout';
import DashboardLayout from './Components/Layout/DashboardLayout';
// import { StytchUIProvider } from './Providers/StytchProvider';
// import { EmailLogin } from './Auth/EmailLogin';
// import { Authenticate } from './Pages/Authenticate';
// import AuthGuard from './Auth/AuthGuard.jsx';

// Import all page components
import LandingHero from './Components/HomeComponents/LandingHero';
import About from './Pages/About';
import Features from './Pages/Features';
import Dashboard from './Components/Dashboard';
import BatchCalculator from './Components/BatchCalculator';
import EventWizard from './Components/EventWizard';
import FeaturedCocktailPage from "./Pages/FeaturedCocktailPage";
import SavedCocktailsPage from './Pages/savedCocktailsPage';

function App() {
  return (
    // <StytchUIProvider>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingHero />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          {/* <Route path="/login" element={<EmailLogin />} />
          <Route path="/authenticate" element={<Authenticate />} /> */}
        </Route>

        {/* Protected routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/featured-cocktail" element={ <FeaturedCocktailPage />} />
          <Route path="/batch-calculator" element={<BatchCalculator />} />
          <Route path="/event-wizard" element={<EventWizard />} />
          <Route path="/saved-cocktails/:id" element={<SavedCocktailsPage />} />
        </Route>
      </Routes>
    // </StytchUIProvider>
  );
}

export default App;
