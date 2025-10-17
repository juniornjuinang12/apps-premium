import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppDetail from "./AppDetail";
import "./App.css";
import Home from "./Home";
import Adobe from "./adobe"; // + ajouté

function App() {
  return (
    <Router>
      <Routes>
        {/* Page principale */}
        <Route path="/" element={<Home />} />
        {/* Page détail pour une app */}
        <Route path="/app/:id" element={<AppDetail />} />
        {/* Page Adobe */}
        <Route path="/adobe" element={<Adobe />} /> {/* + ajouté */}
      </Routes>
    </Router>
  );
}

export default App;
