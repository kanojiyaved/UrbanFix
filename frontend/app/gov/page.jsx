"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getIssues, updateIssueStatus } from '../../services/mockDb';
import { MapPin, Clock, CheckCircle, ShieldAlert } from 'lucide-react';

export default function GovDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'gov') {
        router.push(user.role === 'contractor' ? '/contractor' : '/');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isAuthorized) {
      setIssues(getIssues().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    }
  }, [isAuthorized]);

  const handleAssign = (id, contractorName) => {
    if (!contractorName) return;
    const updated = updateIssueStatus(id, { 
      status: 'assigned', 
      assignedContractor: contractorName 
    });
    
    setIssues(prev => prev.map(p => p.id === id ? updated : p));
  };

  if (!isAuthorized) return <div className="container" style={{ padding: '4rem' }}>Loading...</div>;

  const filteredIssues = issues.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'reported': return <span className="badge badge-reported">Needs Assignment</span>;
      case 'assigned': return <span className="badge badge-assigned">Assigned</span>;
      case 'fixed': return <span className="badge badge-fixed">Resolved</span>;
      default: return null;
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Government Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and dispatch reports to contractors.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter === 'reported' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('reported')}>Pending</button>
          <button className={`btn ${filter === 'assigned' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('assigned')}>Assigned</button>
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="glass-card text-center animate-fade-in delay-100" style={{ padding: '4rem 2rem' }}>
          <ShieldAlert size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>No reports found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No issues match the current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in delay-100">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="glass-card flex flex-col">
              <div className="flex justify-between items-center mb-4">
                {getStatusBadge(issue.status)}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} />
                  {new Date(issue.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-4 mb-4 flex-grow-1">
                <img src={issue.imageBefore} alt="Issue" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Report #{issue.id.slice(-5)}
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', border: '1px solid var(--surface-border)' }}>
                      {issue.issueType || 'Pothole'}
                    </span>
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    <MapPin size={16} color="var(--primary)" />
                    {issue.location.lat.toFixed(4)}, {issue.location.lng.toFixed(4)}
                  </p>
                  {issue.assignedContractor && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Assigned to: <strong style={{ color: 'var(--text-primary)' }}>{issue.assignedContractor}</strong>
                    </p>
                  )}
                </div>
              </div>

              {issue.status === 'reported' && (
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                  <label className="form-label">Assign to Contractor:</label>
                  <div className="flex gap-2">
                    <select id={`contractor-${issue.id}`} className="form-control" style={{ padding: '0.5rem' }}>
                      <option value="">Select Contractor...</option>
                      <option value="City Maintenance Dept">City Maintenance Dept</option>
                      <option value="RapidFix Private Ltd">RapidFix Private Ltd</option>
                      <option value="Highway Services Corp">Highway Services Corp</option>
                      <option value="Waste Management Department">Waste Management Department</option>
                    </select>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        const select = document.getElementById(`contractor-${issue.id}`);
                        handleAssign(issue.id, select.value);
                      }}
                    >
                      Dispatch
                    </button>
                  </div>
                </div>
              )}

              {issue.status === 'fixed' && (
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                    <CheckCircle size={18} /> Fixed by {issue.assignedContractor}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
