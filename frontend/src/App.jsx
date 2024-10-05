import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
// Import your other components here

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
