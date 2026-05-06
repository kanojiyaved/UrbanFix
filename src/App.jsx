import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CitizenReport from './pages/CitizenReport';
import GovDashboard from './pages/GovDashboard';
import ContractorDashboard from './pages/ContractorDashboard';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<CitizenReport />} />
            <Route path="/gov" element={<GovDashboard />} />
            <Route path="/contractor" element={<ContractorDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
