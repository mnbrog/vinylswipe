// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";
import SwipeView from "./components/SwipeView";
import Crate from "./components/Crate";
import { AuthProvider } from "./contexts/AuthContext";
import { CrateProvider } from "./contexts/CrateContext";

function App() {
  return (
    <AuthProvider>
      <CrateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/swipe" element={<SwipeView />} />
            <Route path="/crate" element={<Crate />} />
          </Routes>
        </Router>
      </CrateProvider>
    </AuthProvider>
  );
}

export default App;