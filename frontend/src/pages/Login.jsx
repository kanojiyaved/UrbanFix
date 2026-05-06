import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, MapPin, HardHat, LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');
  
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) return;

    if (role === 'gov') {
      login('gov', 'Government Official');
      navigate(from === '/login' || from === '/' ? '/gov' : from, { replace: true });
    } else if (role === 'contractor') {
      login('contractor', 'City Maintenance Dept');
      navigate(from === '/login' || from === '/' ? '/contractor' : from, { replace: true });
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1rem' }}>
            <LogIn size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '2rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Select Role to Continue</label>
            <div className="flex flex-col gap-3">
              <label 
                className={`glass flex items-center gap-3 p-3 cursor-pointer ${role === 'gov' ? 'border-primary' : ''}`}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: role === 'gov' ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                  backgroundColor: role === 'gov' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="role" 
                  value="gov" 
                  checked={role === 'gov'} 
                  onChange={(e) => setRole(e.target.value)} 
                  style={{ display: 'none' }}
                />
                <MapPin color={role === 'gov' ? 'var(--primary)' : 'var(--text-secondary)'} />
                <div>
                  <div style={{ fontWeight: '600' }}>Government Official</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Manage reports & assign tasks</div>
                </div>
              </label>

              <label 
                className={`glass flex items-center gap-3 p-3 cursor-pointer ${role === 'contractor' ? 'border-warning' : ''}`}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: role === 'contractor' ? '1px solid var(--warning)' : '1px solid var(--surface-border)',
                  backgroundColor: role === 'contractor' ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="role" 
                  value="contractor" 
                  checked={role === 'contractor'} 
                  onChange={(e) => setRole(e.target.value)} 
                  style={{ display: 'none' }}
                />
                <HardHat color={role === 'contractor' ? 'var(--warning)' : 'var(--text-secondary)'} />
                <div>
                  <div style={{ fontWeight: '600' }}>Contractor</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>View assigned tasks & submit fixes</div>
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!role}
          >
            Sign In <LogIn size={18} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/signup')} 
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign Up
            </span>
          </p>
          <p>Just looking to report a pothole?</p>
          <button 
            type="button"
            className="btn btn-secondary" 
            style={{ marginTop: '0.5rem', width: '100%' }}
            onClick={() => navigate('/report')}
          >
            <ShieldAlert size={16} /> Go to Citizen Portal (No Login)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
