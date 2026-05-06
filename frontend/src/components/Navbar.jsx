import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ShieldAlert, HardHat, Home, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <MapPin color="var(--primary)" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="text-gradient">UrbanFix</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle(isActive('/'))}>
          <Home size={18} /> Home
        </Link>
        <Link to="/report" style={navLinkStyle(isActive('/report'))}>
          <ShieldAlert size={18} /> Report Pothole
        </Link>
        
        {user?.role === 'gov' && (
          <Link to="/gov" style={navLinkStyle(isActive('/gov'))}>
            <MapPin size={18} /> Gov Portal
          </Link>
        )}
        
        {user?.role === 'contractor' && (
          <Link to="/contractor" style={navLinkStyle(isActive('/contractor'))}>
            <HardHat size={18} /> Contractor Portal
          </Link>
        )}

        <div style={{ width: '1px', height: '24px', background: 'var(--surface-border)', margin: '0 0.5rem' }}></div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Hi, {user.name}
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Logout <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
            Login <LogIn size={16} />
          </Link>
        )}
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
