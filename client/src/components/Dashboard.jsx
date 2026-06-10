import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function todayPrefix() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function Dashboard({ onAddEntry }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchSummary() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/summary');
      if (!res.ok) throw new Error('API error');
      setSummary(await res.json());
    } catch {
      setError('Could not load data. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSummary(); }, []);

  const todayEntry = summary?.entries.find((e) => e.date.startsWith(todayPrefix())) ?? null;

  const chartDates = summary?.entries.map((e) => e.date) ?? [];
  const chartSales = summary?.entries.map((e) => e.sales) ?? [];
  const chartCustomers = summary?.entries.map((e) => e.customers) ?? [];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-warm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☕</span>
            <div>
              <h1 className="text-2xl font-bold text-espresso leading-tight">Coffee Shop Logger</h1>
              <p className="text-xs text-burnt font-medium tracking-wide uppercase">Daily Dashboard</p>
            </div>
          </div>
          <button
            onClick={onAddEntry}
            className="px-5 py-2.5 bg-burnt text-white text-sm font-semibold rounded-lg
                       hover:bg-burnt-dark active:scale-[0.98] transition-all duration-150 shadow-warm"
          >
            + Add Entry
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {loading && (
          <div className="text-center py-20 text-espresso/50 font-medium">Loading your coffee data…</div>
        )}

        {error && (
          <div className="bg-burnt/10 border border-burnt/20 text-burnt-dark text-sm font-medium px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && summary && (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Today's Sales"
                value={todayEntry ? `$${fmt(todayEntry.sales)}` : '—'}
                sub={todayEntry ? `${todayEntry.customers} customers` : 'No entry yet'}
                accent="burnt"
              />
              <StatCard
                label="All-Time Sales"
                value={`$${fmt(summary.totalSales)}`}
                sub={`${summary.entries.length} days logged`}
                accent="burnt"
              />
              <StatCard
                label="All-Time Customers"
                value={summary.totalCustomers.toLocaleString()}
                sub={`avg ${summary.entries.length > 0 ? Math.round(summary.totalCustomers / summary.entries.length) : 0}/day`}
                accent="sage"
              />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-warm p-6 border border-cream">
              <h2 className="text-lg font-semibold text-espresso mb-1">Performance Over Time</h2>
              <p className="text-xs text-espresso/50 mb-4">Sales ($) and customer count per day</p>
              <Plot
                data={[
                  {
                    x: chartDates,
                    y: chartSales,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Sales ($)',
                    line: { color: '#8B5A3C', width: 2.5 },
                    marker: { color: '#8B5A3C', size: 6 },
                    yaxis: 'y',
                  },
                  {
                    x: chartDates,
                    y: chartCustomers,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Customers',
                    line: { color: '#2E8B57', width: 2.5, dash: 'dot' },
                    marker: { color: '#2E8B57', size: 6 },
                    yaxis: 'y2',
                  },
                ]}
                layout={{
                  autosize: true,
                  height: 320,
                  margin: { l: 55, r: 55, t: 20, b: 60 },
                  paper_bgcolor: '#FFFFFF',
                  plot_bgcolor: '#FDFAF7',
                  font: { family: 'Inter, sans-serif', color: '#2B1F15' },
                  legend: {
                    orientation: 'h',
                    x: 0.5,
                    xanchor: 'center',
                    y: -0.22,
                    font: { size: 12 },
                  },
                  xaxis: {
                    title: { text: 'Date', standoff: 10 },
                    tickangle: -30,
                    gridcolor: '#F5EFE7',
                    linecolor: '#F4A460',
                    tickfont: { size: 11 },
                  },
                  yaxis: {
                    title: { text: 'Sales ($)' },
                    gridcolor: '#F5EFE7',
                    tickfont: { size: 11 },
                    tickprefix: '$',
                  },
                  yaxis2: {
                    title: { text: 'Customers' },
                    overlaying: 'y',
                    side: 'right',
                    gridcolor: 'transparent',
                    tickfont: { size: 11 },
                  },
                  hovermode: 'x unified',
                }}
                config={{ responsive: true, displayModeBar: false }}
                style={{ width: '100%' }}
                useResizeHandler
              />
            </div>

            {/* Recent Entries Table */}
            {summary.entries.length > 0 && (
              <div className="bg-white rounded-2xl shadow-warm border border-cream overflow-hidden">
                <div className="px-6 py-4 border-b border-cream">
                  <h2 className="text-lg font-semibold text-espresso">Recent Entries</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-cream/60">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-espresso/60 uppercase tracking-wide">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-espresso/60 uppercase tracking-wide">Sales</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-espresso/60 uppercase tracking-wide">Customers</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream">
                      {[...summary.entries].reverse().slice(0, 10).map((entry) => (
                        <tr key={entry.id} className="hover:bg-cream/30 transition-colors">
                          <td className="px-6 py-3 text-espresso font-medium">{entry.date.replace('T', ' ')}</td>
                          <td className="px-6 py-3 text-right text-burnt font-semibold">${fmt(entry.sales)}</td>
                          <td className="px-6 py-3 text-right text-sage font-semibold">{entry.customers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  const valueClass = accent === 'sage' ? 'text-sage' : 'text-burnt';
  return (
    <div className="bg-white rounded-2xl shadow-warm p-5 border border-cream">
      <p className="text-xs font-semibold text-espresso/50 uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-bold ${valueClass} leading-none mb-1`}>{value}</p>
      <p className="text-xs text-espresso/50 mt-1">{sub}</p>
    </div>
  );
}
