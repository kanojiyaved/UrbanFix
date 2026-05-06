import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, MapPin, HardHat } from 'lucide-react';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!role || !name.trim()) return;

    // In a real app, this would create a user in the database.
    // Here we just log them in immediately.
    login(role, name);
    
    if (role === 'gov') {
      navigate('/gov', { replace: true });
    } else {
      navigate('/contractor', { replace: true });
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1rem' }}>
            <UserPlus size={32} color="var(--accent)" />
          </div>
          <h1 style={{ fontSize: '2rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Join UrbanFix to manage infrastructure</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. John Doe or City Dept" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Role</label>
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
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!role || !name.trim()}
          >
            Sign Up <UserPlus size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>
            Already have an account?{' '}
            <span 
              onClick={() => navigate('/login')} 
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
