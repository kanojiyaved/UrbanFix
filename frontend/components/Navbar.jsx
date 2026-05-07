"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MapPin, ShieldAlert, HardHat, Home, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-primary)' }}>
        <MapPin color="var(--primary)" size={28} />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="text-gradient">UrbanFix</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="/" style={navLinkStyle(isActive('/'))}>
          <Home size={18} /> Home
        </Link>
        <Link href="/report" style={navLinkStyle(isActive('/report'))}>
          <ShieldAlert size={18} /> Report Issue
        </Link>
        
        {user?.role === 'gov' && (
          <Link href="/gov" style={navLinkStyle(isActive('/gov'))}>
            <MapPin size={18} /> Gov Portal
          </Link>
        )}
        
        {user?.role === 'contractor' && (
          <Link href="/contractor" style={navLinkStyle(isActive('/contractor'))}>
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
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link href="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              Login <LogIn size={16} />
            </Link>
            <Link href="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
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
