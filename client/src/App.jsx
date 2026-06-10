import React, { useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import EntryForm from './components/EntryForm.jsx';

export default function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-cream font-sans">
      {view === 'dashboard' ? (
        <Dashboard onAddEntry={() => setView('form')} />
      ) : (
        <EntryForm onBack={() => setView('dashboard')} />
      )}
    </div>
  );
}
