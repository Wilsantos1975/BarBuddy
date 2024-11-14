import React from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from "./Components/Layout/Layout.jsx";
import Dashboard from "./Components/Dashboard";
import FeaturedCocktailPage from "./Pages/FeaturedCocktailPage";
import BatchCalculator from "./Components/BatchCalculator";
import EventWizard from "./Components/EventWizard";
import SavedCocktailsPage from './Pages/savedCocktailsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/featured-cocktail" element={<FeaturedCocktailPage />} />
        <Route path="/batch-calculator" element={<BatchCalculator />} />
        <Route path="/event-wizard" element={<EventWizard />} />
        <Route path="/saved-cocktails/:id" element={<SavedCocktailsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
