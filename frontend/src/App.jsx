import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import BatchCalculatorDisplay from "./Pages/BatchCalculatorDisplay";
import EventsWizardDisplay from "./Pages/EventsWizardDisplay";
import Layout from "./Components/Common/Layout";

function App() {
  return (
    <div className="App">
      <Router>
          <Layout/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/batch-calculator" element={<BatchCalculatorDisplay />} />
          <Route path="/event-wizard" element={<EventsWizardDisplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
