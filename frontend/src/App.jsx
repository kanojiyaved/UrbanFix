import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CitizenReport from './pages/CitizenReport';
import GovDashboard from './pages/GovDashboard';
import ContractorDashboard from './pages/ContractorDashboard';
import Login from './pages/Login';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If logged in but wrong role, redirect to appropriate dashboard or home
    return <Navigate to={user.role === 'gov' ? '/gov' : '/contractor'} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<CitizenReport />} />
              <Route path="/login" element={<Login />} />
              
              <Route 
                path="/gov" 
                element={
                  <ProtectedRoute allowedRoles={['gov']}>
                    <GovDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/contractor" 
                element={
                  <ProtectedRoute allowedRoles={['contractor']}>
                    <ContractorDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
