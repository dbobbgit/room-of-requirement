import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/theme';

// Import pages
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import MediaListPage from './pages/MediaListPage';
import AddMediaPage from './pages/AddMediaPage';
import ReqRoomPage from './pages/ReqRoomPage';

function App() {
  // Mock authentication state - in a real app, this would come from your auth context
  const isAuthenticated = true; // Set to true for development to see the main UI
  
  return (
    <ThemeProvider initialTheme="default" initialVariant="default" initialIntensity={1}>
      <div className="min-h-screen bg-background-main text-text-primary overflow-hidden">
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/req-room" 
              element={
                isAuthenticated ? 
                <ReqRoomPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/movies" 
              element={
                isAuthenticated ? 
                <MediaListPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/games" 
              element={
                isAuthenticated ? 
                <MediaListPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/books" 
              element={
                isAuthenticated ? 
                <MediaListPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/music" 
              element={
                isAuthenticated ? 
                <MediaListPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/add/:type" 
              element={
                isAuthenticated ? 
                <AddMediaPage /> : 
                <Navigate to="/login" />
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
