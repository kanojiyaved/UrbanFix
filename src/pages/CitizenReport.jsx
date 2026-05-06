import React, { useState, useRef } from 'react';
import { Camera, MapPin, Upload, CheckCircle } from 'lucide-react';
import { savePothole } from '../services/mockDb';

const CitizenReport = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setLoadingLoc(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) return;
    
    setSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      savePothole({
        imageBefore: image,
        location: location,
      });
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="glass-card animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <CheckCircle size={64} color="var(--accent)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Report Submitted Successfully!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Thank you for helping keep our streets safe. The authorities have been notified.
          </p>
          <button onClick={() => { setSuccess(false); setImage(null); setLocation(null); }} className="btn btn-primary">
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Report a Pothole</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Upload a photo and capture your precise location to notify the city.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">1. Upload Photo of the Pothole</label>
            {!image ? (
              <div 
                className="form-control" 
                style={{ borderStyle: 'dashed', textAlign: 'center', padding: '3rem 1rem', cursor: 'pointer' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={32} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
                <p>Click to upload or take a photo</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img src={image} alt="Preview" className="img-preview" />
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.5rem' }}
                  onClick={() => setImage(null)}
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">2. Capture Precise Location</label>
            <div className="flex gap-4 items-center">
              <button 
                type="button" 
                className="btn btn-secondary flex-grow-1" 
                onClick={getLocation}
                disabled={loadingLoc}
                style={{ width: '100%' }}
              >
                <MapPin size={18} />
                {loadingLoc ? 'Acquiring...' : location ? 'Location Captured' : 'Get Current Location'}
              </button>
            </div>
            {location && (
              <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.5rem' }}>
                ✓ Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!image || !location || submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
            <Upload size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitizenReport;
