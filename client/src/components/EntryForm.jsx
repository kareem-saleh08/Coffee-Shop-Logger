import React, { useState } from 'react';

// ── Reuse the same header components ──────────────────────────────────────────

const BEAN_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='78' viewBox='0 0 60 78' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='39' rx='27' ry='36' fill='%238B5A3C'/%3E%3Cpath d='M30 9C43 25 43 53 30 69' stroke='%23F5EFE7' stroke-width='5' fill='none'/%3E%3C/svg%3E")`;

const Bean = ({ style, className = '' }) => (
  <div className={`absolute pointer-events-none ${className}`} style={style}>
    <svg viewBox="0 0 20 26" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="10" cy="13" rx="9" ry="12" fill="#8B5A3C"/>
      <path d="M10 3C14.5 8.5 14.5 17.5 10 23" stroke="#F5EFE7" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

// ── Helpers ────────────────────────────────────────────────────────────────────

function pad(n) { return String(n).padStart(2, '0'); }

function toLocalDatetimeValue() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function EntryForm({ onBack }) {
  const [date,      setDate]      = useState(toLocalDatetimeValue());
  const [sales,     setSales]     = useState('');
  const [customers, setCustomers] = useState('');
  const [status,    setStatus]    = useState(null);
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const isoDate = date.length === 16 ? `${date}:00` : date;

    try {
      const res = await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: isoDate, sales: parseFloat(sales), customers: parseInt(customers, 10) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      } else {
        setStatus({ type: 'success', message: `Entry logged — $${data.sales.toFixed(2)} · ${data.customers} customers` });
        setSales(''); setCustomers(''); setDate(toLocalDatetimeValue());
      }
    } catch {
      setStatus({ type: 'error', message: 'Could not reach the server. Is it running?' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">

      {/* ── Floating background beans ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Bean className="anim-float"     style={{ width: 22, height: 29, top: '20%',  left:  '3%',  opacity: 0.09, transform: 'rotate(30deg)',  animationDelay: '0s'   }} />
        <Bean className="anim-float-alt" style={{ width: 16, height: 21, top: '45%',  right: '4%',  opacity: 0.07, transform: 'rotate(-20deg)', animationDelay: '1.5s' }} />
        <Bean className="anim-float"     style={{ width: 18, height: 23, top: '65%',  left:  '6%',  opacity: 0.08, transform: 'rotate(55deg)',  animationDelay: '0.9s' }} />
        <Bean className="anim-float-alt" style={{ width: 14, height: 18, top: '80%',  right: '7%',  opacity: 0.07, transform: 'rotate(-40deg)', animationDelay: '2.2s' }} />
        <Bean className="anim-float"     style={{ width: 26, height: 34, top: '30%',  right: '12%', opacity: 0.05, transform: 'rotate(15deg)',  animationDelay: '1.1s' }} />
      </div>

      {/* ── Header ── */}
      <header
        className="relative overflow-hidden shadow-warm-md"
        style={{ background: 'linear-gradient(135deg,#F5EFE7 0%,#EDD9C0 55%,#DEB887 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: BEAN_PATTERN, backgroundSize: '60px 78px' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <button
            onClick={onBack}
            className="shrink-0 flex items-center gap-1.5 text-burnt hover:text-burnt-dark
                       font-semibold text-sm transition-colors duration-150 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <div className="w-px h-6 bg-burnt/25 shrink-0" />
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center bg-white/40 rounded-xl
                         shadow-warm backdrop-blur-sm anim-float shrink-0"
              style={{ animationDuration: '3.5s' }}
            >
              <span style={{ fontSize: 22 }}>☕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-espresso leading-tight">Log Today's Numbers</h1>
              <p className="text-[9px] font-bold text-burnt/70 uppercase tracking-[0.2em] mt-0.5">
                Coffee Shop Logger
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Form area ── */}
      <main className="relative z-10 flex items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md anim-fade-in-up" style={{ animationDelay: '0.05s' }}>

          {/* Decorative small beans near the card */}
          <div className="relative">
            <Bean style={{ width: 28, height: 36, top: -18, right: -12, opacity: 0.13, transform: 'rotate(-25deg)', position: 'absolute' }} />
            <Bean style={{ width: 20, height: 26, bottom: -14, left: -10, opacity: 0.10, transform: 'rotate(40deg)',  position: 'absolute' }} />

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-warm-md border border-cream p-8 relative overflow-hidden">
              {/* Subtle inner coffee-pattern accent (top-right corner) */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #8B5A3C 0%, transparent 70%)' }}
              />

              <h2 className="text-[22px] font-bold text-espresso mb-1">Record Daily Entry</h2>
              <p className="text-xs text-espresso/40 font-medium mb-7">
                Log your sales and customer count for any date.
              </p>

              {/* Status message */}
              {status && (
                <div
                  className={`mb-6 px-4 py-3 rounded-xl text-sm font-semibold
                    ${status.type === 'success'
                      ? 'bg-sage/10 text-sage border border-sage/20'
                      : 'bg-burnt/10 text-burnt-dark border border-burnt/20'}`}
                >
                  {status.type === 'success' ? '✓ ' : '✕ '}{status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Date & Time */}
                <div>
                  <label className="block text-xs font-bold text-espresso mb-1.5 uppercase tracking-wider">
                    Date &amp; Time
                  </label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-sandy/40 bg-white text-espresso
                               focus:outline-none focus:border-burnt focus:ring-4 focus:ring-burnt/10
                               transition-all duration-200 text-sm font-medium"
                  />
                </div>

                {/* Sales */}
                <div>
                  <label className="block text-xs font-bold text-espresso mb-1.5 uppercase tracking-wider">
                    Sales Total
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-burnt font-bold text-base select-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={sales}
                      onChange={e => setSales(e.target.value)}
                      required
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-sandy/40 bg-white text-espresso
                                 focus:outline-none focus:border-burnt focus:ring-4 focus:ring-burnt/10
                                 transition-all duration-200 text-sm font-medium placeholder-espresso/25"
                    />
                  </div>
                </div>

                {/* Customers */}
                <div>
                  <label className="block text-xs font-bold text-espresso mb-1.5 uppercase tracking-wider">
                    Customer Count
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 select-none" style={{ fontSize: 15 }}>
                      👥
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="0"
                      value={customers}
                      onChange={e => setCustomers(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-sandy/40 bg-white text-espresso
                                 focus:outline-none focus:border-burnt focus:ring-4 focus:ring-burnt/10
                                 transition-all duration-200 text-sm font-medium placeholder-espresso/25"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-burnt text-white font-bold text-sm tracking-wide
                             hover:bg-burnt-dark hover:scale-[1.02] active:scale-[0.97]
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                             transition-all duration-150 shadow-warm hover:shadow-warm-md mt-2"
                >
                  {loading ? 'Logging…' : '☕ Log Day'}
                </button>

              </form>
            </div>
          </div>

          {/* Tip text */}
          <p className="text-center text-[11px] text-espresso/30 font-medium mt-5">
            Sector is always set to <span className="font-bold text-burnt/50">coffee</span> automatically.
          </p>
        </div>
      </main>
    </div>
  );
}
