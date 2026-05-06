import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, ShieldAlert, HardHat, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <MapPin color="var(--primary)" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="text-gradient">UrbanFix</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/" style={navLinkStyle(isActive('/'))}>
          <Home size={18} /> Home
        </Link>
        <Link to="/report" style={navLinkStyle(isActive('/report'))}>
          <ShieldAlert size={18} /> Report Pothole
        </Link>
        <Link to="/gov" style={navLinkStyle(isActive('/gov'))}>
          <MapPin size={18} /> Gov Portal
        </Link>
        <Link to="/contractor" style={navLinkStyle(isActive('/contractor'))}>
          <HardHat size={18} /> Contractor Portal
        </Link>
      </div>
    </nav>
  );
};

const navLinkStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  textDecoration: 'none',
  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
  fontWeight: isActive ? '600' : '500',
  transition: 'color 0.2s ease',
  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
  paddingBottom: '0.25rem'
});

export default Navbar;
