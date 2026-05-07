import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'UrbanFix - Issue & Garbage Reporting',
  description: 'Infrastructure management and issue reporting system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <source src="/Create_an_ultra_realistic_cine.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.6)',
          zIndex: -1,
          pointerEvents: 'none',
        }} />
        <AuthProvider>
          <div className="app-wrapper">
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
