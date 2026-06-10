import React, { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import EntryForm from './components/EntryForm.jsx';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [fading, setFading] = useState(false);

  function navigate(v) {
    setFading(true);
    setTimeout(() => { setView(v); setFading(false); }, 180);
  }

  return (
    <div
      className="min-h-screen bg-cream font-sans"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.18s ease' }}
    >
      {view === 'dashboard'
        ? <Dashboard onAddEntry={() => navigate('form')} />
        : <EntryForm onBack={() => navigate('dashboard')} />}
    </div>
  );
}
