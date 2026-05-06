"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, MapPin, HardHat, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className="text-center animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
          Fixing Our Streets, <br />
          <span className="text-gradient">Together.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          UrbanFix connects citizens, government, and contractors to identify, assign, and resolve infrastructure issues like potholes with precise geographic tracking.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 animate-fade-in delay-100">
        <div className="glass-card flex flex-col items-center text-center">
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <ShieldAlert size={32} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Citizens</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
            Spot a pothole? Snap a photo. We'll grab your precise location and notify the authorities instantly.
          </p>
          <Link href="/report" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
            Report Issue <ArrowRight size={16} />
          </Link>
        </div>

        <div className="glass-card flex flex-col items-center text-center delay-200">
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <MapPin size={32} color="var(--accent)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Government</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
            Review reported issues, analyze locations, and dispatch the right contractors efficiently.
          </p>
          <Link href="/gov" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
            Access Portal <ArrowRight size={16} />
          </Link>
        </div>

        <div className="glass-card flex flex-col items-center text-center delay-300">
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <HardHat size={32} color="var(--warning)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contractors</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>
            View assigned tasks, navigate to the exact spot, and upload proof of repair.
          </p>
          <Link href="/contractor" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
            View Tasks <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
