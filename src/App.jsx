// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Callback from "./components/Callback.jsx";
import SwipeView from "./components/SwipeView.jsx";
import Crate from "./components/Crate.jsx";
import Shelf from "./components/Shelf.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CrateProvider } from "./contexts/CrateContext.jsx";
import { ShelfProvider } from "./contexts/ShelfContext.jsx";

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
