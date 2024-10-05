import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/Common/NavBar";
import Dashboard from "./Components/Dashboard";
import BatchCalculatorDisplay from "./Pages/BatchCalculatorDisplay";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/batch-calculator" element={<BatchCalculatorDisplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
