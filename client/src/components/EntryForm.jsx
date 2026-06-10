import React, { useState } from 'react';

function toLocalDatetimeValue() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export default function EntryForm({ onBack }) {
  const [date, setDate] = useState(toLocalDatetimeValue());
  const [sales, setSales] = useState('');
  const [customers, setCustomers] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const isoDate = date.length === 16 ? `${date}:00` : date;

    try {
      const res = await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: isoDate,
          sales: parseFloat(sales),
          customers: parseInt(customers, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      } else {
        setStatus({ type: 'success', message: `Entry logged! Sales: $${data.sales.toFixed(2)}, Customers: ${data.customers}` });
        setSales('');
        setCustomers('');
        setDate(toLocalDatetimeValue());
      }
    } catch {
      setStatus({ type: 'error', message: 'Could not reach the server. Is it running?' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-white shadow-warm px-6 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-burnt hover:text-burnt-dark transition-colors font-medium flex items-center gap-1"
        >
          ← Back
        </button>
        <div className="w-px h-5 bg-sandy/40" />
        <span className="text-espresso font-semibold text-lg">☕ Coffee Shop Logger</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-warm-md p-8 border border-cream">
          <h1 className="text-2xl font-bold text-espresso mb-1">Log Today's Numbers</h1>
          <p className="text-espresso/60 text-sm mb-8">Record your daily sales and customer count.</p>

          {status && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-sage/10 text-sage border border-sage/20'
                  : 'bg-burnt/10 text-burnt-dark border border-burnt/20'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-espresso mb-1.5">
                Date &amp; Time
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-sandy/50 bg-white text-espresso
                           focus:outline-none focus:ring-2 focus:ring-burnt/40 focus:border-burnt
                           transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-espresso mb-1.5">
                Sales Total ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 243.50"
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-sandy/50 bg-white text-espresso
                           focus:outline-none focus:ring-2 focus:ring-burnt/40 focus:border-burnt
                           transition-colors text-sm placeholder-espresso/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-espresso mb-1.5">
                Customer Count
              </label>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 28"
                value={customers}
                onChange={(e) => setCustomers(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-sandy/50 bg-white text-espresso
                           focus:outline-none focus:ring-2 focus:ring-burnt/40 focus:border-burnt
                           transition-colors text-sm placeholder-espresso/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-burnt text-white font-semibold text-sm
                         hover:bg-burnt-dark active:scale-[0.98] transition-all duration-150
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-warm mt-2"
            >
              {loading ? 'Logging…' : 'Log Day'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
