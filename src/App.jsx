import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CrateProvider } from './contexts/CrateContext.jsx';
import { ShelfProvider } from './contexts/ShelfContext.jsx';
import Login from './components/Login.jsx';
import Callback from './components/Callback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SwipeView from './components/SwipeView.jsx';
import Shelf from './components/Shelf.jsx';
import CrateView from './components/CrateView.jsx';
import DemoApp from './DemoApp.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CrateProvider>
          <ShelfProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/demo" element={<DemoApp />} />
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
                    <CrateView />
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
          </ShelfProvider>
        </CrateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
