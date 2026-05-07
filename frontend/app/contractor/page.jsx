"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getIssues, updateIssueStatus } from '../../services/mockDb';
import { Camera, MapPin, Upload, HardHat, CheckCircle } from 'lucide-react';

export default function ContractorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [locationAfter, setLocationAfter] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'contractor') {
        router.push(user.role === 'gov' ? '/gov' : '/');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isAuthorized && user) {
      loadTasks(user.name); // Using user.name as the contractorId
    }
  }, [isAuthorized, user]);

  const loadTasks = (contractorId) => {
    const allIssues = getIssues();
    const myTasks = allIssues.filter(p => 
      (p.status === 'assigned' || p.status === 'fixed') && 
      p.assignedContractor === contractorId
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setTasks(myTasks);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageAfter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setLoadingLoc(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAfter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoadingLoc(false);
        },
        (error) => {
          alert('Error getting location: ' + error.message);
          setLoadingLoc(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLoadingLoc(false);
    }
  };

  const handleSubmitResolution = () => {
    if (!selectedTask || !imageAfter || !locationAfter) return;
    
    // In a real app, we would verify if locationAfter matches the original location
    updateIssueStatus(selectedTask.id, {
      status: 'fixed',
      imageAfter: imageAfter,
      resolvedAt: new Date().toISOString()
    });
    
    loadTasks(user.name);
    setSelectedTask(null);
    setImageAfter(null);
    setLocationAfter(null);
  };

  if (!isAuthorized) return <div className="container" style={{ padding: '4rem' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HardHat color="var(--warning)" /> Contractor Portal
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}. Manage your assigned tasks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="glass-card animate-fade-in delay-100" style={{ gridColumn: 'span 1' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
            My Assignments
          </h2>
          
          {tasks.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No active assignments.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`glass flex items-center p-3 cursor-pointer ${selectedTask?.id === task.id ? 'border-primary' : ''}`}
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    border: selectedTask?.id === task.id ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                    backgroundColor: selectedTask?.id === task.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
                  }}
                  onClick={() => {
                    setSelectedTask(task);
                    setImageAfter(null);
                    setLocationAfter(null);
                  }}
                >
                  <div style={{ marginRight: '1rem' }}>
                    {task.status === 'fixed' ? <CheckCircle color="var(--accent)" size={20} /> : <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--warning)' }}></div>}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Task #{task.id.slice(-5)}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(task.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Details & Resolution */}
        <div className="glass-card animate-fade-in delay-200" style={{ gridColumn: 'span 2' }}>
          {!selectedTask ? (
            <div className="flex flex-col items-center justify-center h-full" style={{ minHeight: '300px', color: 'var(--text-secondary)' }}>
              <HardHat size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Select a task from the list to view details or submit resolution.</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6 border-bottom" style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Task Details #{selectedTask.id.slice(-5)}
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', border: '1px solid var(--surface-border)', color: 'var(--text-secondary)' }}>
                    {selectedTask.issueType || 'Pothole'}
                  </span>
                </h2>
                {selectedTask.status === 'fixed' ? (
                  <span className="badge badge-fixed">Resolved</span>
                ) : (
                  <span className="badge badge-assigned">In Progress</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Reported Issue</h3>
                  <img src={selectedTask.imageBefore} alt="Before" className="img-preview" />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                    <MapPin size={16} /> Location: {selectedTask.location.lat.toFixed(4)}, {selectedTask.location.lng.toFixed(4)}
                  </p>
                </div>

                {selectedTask.status === 'fixed' ? (
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Resolution</h3>
                    <img src={selectedTask.imageAfter} alt="After" className="img-preview" />
                    <p style={{ fontSize: '0.9rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                      <CheckCircle size={16} /> Fixed on {new Date(selectedTask.resolvedAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Submit Resolution</h3>
                    
                    {!imageAfter ? (
                      <div 
                        className="form-control" 
                        style={{ borderStyle: 'dashed', textAlign: 'center', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera size={32} color="var(--text-secondary)" style={{ marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.9rem' }}>Upload "After" Photo</p>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
                      </div>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <img src={imageAfter} alt="After Preview" className="img-preview" />
                        <button type="button" className="btn btn-secondary" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => setImageAfter(null)}>Change</button>
                      </div>
                    )}

                    <div className="mt-4">
                      <button type="button" className="btn btn-secondary" onClick={getLocation} disabled={loadingLoc} style={{ width: '100%', marginBottom: '1rem' }}>
                        <MapPin size={16} /> {loadingLoc ? 'Verifying Location...' : locationAfter ? 'Location Verified' : 'Verify Location'}
                      </button>

                      <button 
                        type="button" 
                        className="btn btn-success" 
                        style={{ width: '100%' }}
                        disabled={!imageAfter || !locationAfter}
                        onClick={handleSubmitResolution}
                      >
                        <CheckCircle size={16} /> Mark as Fixed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
