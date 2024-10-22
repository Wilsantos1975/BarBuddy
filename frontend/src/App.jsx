import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import BatchCalculatorDisplay from "./Pages/BatchCalculatorDisplay";
import EventWizard from "./components/EventWizard";
import Layout from "./Components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/batch-calculator" element={<BatchCalculatorDisplay />} />
          <Route path="/event-wizard" element={<EventWizard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
