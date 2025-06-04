// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";
import SwipeView from "./components/SwipeView";
import Crate from "./components/Crate";
import Shelf from "./components/Shelf";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CrateProvider } from "./contexts/CrateContext";
import { ShelfProvider } from "./contexts/ShelfContext";

function App() {
  return (
    <AuthProvider>
      <CrateProvider>
        <ShelfProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
              <Route
                path="/swipe"
                element={
                  <ProtectedRoute>
                    <SwipeView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/crate"
                element={
                  <ProtectedRoute>
                    <Crate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shelf"
                element={
                  <ProtectedRoute>
                    <Shelf />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ShelfProvider>
      </CrateProvider>
    </AuthProvider>
  );
}

export default App;