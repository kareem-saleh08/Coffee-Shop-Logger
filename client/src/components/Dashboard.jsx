import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

// ── SVG Icons ──────────────────────────────────────────────────────────────────

const SalesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2.5v1M11 18.5v1" stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"/>
    <path
      d="M7.5 6.5C7.5 5.4 9 4.5 11 4.5s3.5.9 3.5 2.5c0 1.5-1.5 2.3-3.5 2.3S7.5 10 7.5 11.8
         c0 1.6 1.5 2.7 3.5 2.7s3.5-.9 3.5-2"
      stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"
    />
  </svg>
);

const CustomersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="7.5" cy="7" r="3" stroke="#2E8B57" strokeWidth="1.8"/>
    <path d="M1 20c0-3.5 2.5-5.5 6.5-5.5" stroke="#2E8B57" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="16" cy="7.5" r="2.2" stroke="#2E8B57" strokeWidth="1.8"/>
    <path d="M21 20c0-2.5-2-4.5-5-4.5" stroke="#2E8B57" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M7.5 20h14" stroke="#2E8B57" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2.5" y="4" width="17" height="15.5" rx="2.5" stroke="#8B5A3C" strokeWidth="1.8"/>
    <path d="M7 2.5V5M15 2.5V5M2.5 9.5h17" stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="7.5" cy="14" r="1.1" fill="#8B5A3C"/>
    <circle cx="11" cy="14" r="1.1" fill="#8B5A3C"/>
    <circle cx="14.5" cy="14" r="1.1" fill="#8B5A3C"/>
  </svg>
);

// ── Decorative elements ────────────────────────────────────────────────────────

const Bean = ({ style, className = '' }) => (
  <div className={`absolute pointer-events-none ${className}`} style={style}>
    <svg viewBox="0 0 20 26" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="10" cy="13" rx="9" ry="12" fill="#8B5A3C"/>
      <path d="M10 3C14.5 8.5 14.5 17.5 10 23" stroke="#F5EFE7" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const Leaf = ({ style, className = '' }) => (
  <div className={`absolute pointer-events-none ${className}`} style={style}>
    <svg viewBox="0 0 30 52" fill="none" style={{ width: '100%', height: '100%' }}>
      <path d="M15 50C15 50 2 36 4 19C6 6 15 3 15 3C15 3 24 6 26 19C28 36 15 50 15 50Z"
            fill="#2E8B57" fillOpacity="0.75"/>
      <path d="M15 7L15 50" stroke="#1B6B3A" strokeWidth="1.3" strokeLinecap="round" opacity="0.55"/>
      <path d="M15 19L10 27" stroke="#1B6B3A" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
      <path d="M15 29L20 37" stroke="#1B6B3A" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
    </svg>
  </div>
);

// ── Header ─────────────────────────────────────────────────────────────────────

const BEAN_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='78' viewBox='0 0 60 78' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='39' rx='27' ry='36' fill='%238B5A3C'/%3E%3Cpath d='M30 9C43 25 43 53 30 69' stroke='%23F5EFE7' stroke-width='5' fill='none'/%3E%3C/svg%3E")`;

function PageHeader({ right }) {
  return (
    <header
      className="relative overflow-hidden shadow-warm-md"
      style={{ background: 'linear-gradient(135deg,#F5EFE7 0%,#EDD9C0 55%,#DEB887 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: BEAN_PATTERN, backgroundSize: '60px 78px' }}
      />
      <div
        className="absolute right-6 top-2 hidden md:block opacity-[0.18] anim-float"
        style={{ animationDuration: '4.5s' }}
      >
        <svg width="96" height="96" viewBox="0 0 100 100" fill="none">
          <path d="M32 24 Q34 15 36 24" stroke="#8B5A3C" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M46 19 Q48 10 50 19" stroke="#8B5A3C" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M60 24 Q62 15 64 24" stroke="#8B5A3C" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 34h68l-8 46H24L16 34z" fill="#8B5A3C"/>
          <path d="M84 44h6a8 8 0 0 1 0 16h-6" stroke="#8B5A3C" strokeWidth="4.5" strokeLinecap="round"/>
          <rect x="13" y="28" width="74" height="9" rx="4.5" fill="#6B4226"/>
          <ellipse cx="50" cy="81" rx="36" ry="6" fill="#6B4226" fillOpacity="0.35"/>
        </svg>
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className="flex items-center justify-center bg-white/40 rounded-2xl
                       shadow-warm backdrop-blur-sm anim-float shrink-0"
            style={{ animationDuration: '3.2s', width: 52, height: 52 }}
          >
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M10 18 Q11.5 13 13 18" stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M18 15 Q19.5 10 21 15" stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M26 18 Q27.5 13 29 18" stroke="#8B5A3C" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M5 22.5h30l-4 18H9L5 22.5z" fill="#8B5A3C"/>
              <path d="M35 27h3.5a4 4 0 0 1 0 8H35" stroke="#8B5A3C" strokeWidth="3" strokeLinecap="round"/>
              <rect x="3" y="19" width="34" height="5.5" rx="2.75" fill="#6B4226"/>
              <path d="M11 31.5h18" stroke="#F5EFE7" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-espresso leading-tight tracking-tight">
              Coffee Shop Logger
            </h1>
            <p className="text-[9px] font-bold text-burnt/70 uppercase tracking-[0.2em] mt-0.5">
              Daily Performance Dashboard
            </p>
          </div>
        </div>
        {right}
      </div>
    </header>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent = 'burnt', delay = 0 }) {
  const accentHex = accent === 'sage' ? '#2E8B57' : '#8B5A3C';
  const textCls   = accent === 'sage' ? 'text-sage'  : 'text-burnt';
  const bgCls     = accent === 'sage' ? 'bg-sage/10' : 'bg-burnt/10';

  return (
    <div
      className="relative overflow-hidden bg-white rounded-2xl border border-cream/80
                 shadow-warm cursor-default group
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-warm-md
                 anim-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-300 group-hover:w-2"
        style={{ backgroundColor: accentHex }}
      />
      <div className="pl-6 pr-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-extrabold text-espresso/40 uppercase tracking-[0.14em] mb-2">
              {label}
            </p>
            <p className={`text-[2rem] font-bold ${textCls} leading-none mb-1.5 tabular-nums`}>
              {value}
            </p>
            <p className="text-xs text-espresso/40 font-medium truncate">{sub}</p>
          </div>
          <div
            className={`shrink-0 w-12 h-12 rounded-xl ${bgCls} flex items-center justify-center
                        transition-transform duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chart wrapper card ─────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-warm border border-cream/80 overflow-hidden anim-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="px-6 pt-5 pb-1 flex items-start gap-2.5">
        <div className="w-1.5 h-5 mt-0.5 rounded-full bg-burnt shrink-0" />
        <div>
          <h2 className="text-[15px] font-semibold text-espresso">{title}</h2>
          {subtitle && <p className="text-[11px] text-espresso/40 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function todayPrefix() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function weeklyBreakdown(entries) {
  if (!entries || entries.length === 0) return { labels: [], values: [] };
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const firstDate = new Date(sorted[0].date);
  const buckets = {};
  sorted.forEach(e => {
    const days = Math.floor((new Date(e.date) - firstDate) / 86400000);
    const key  = `Week ${Math.floor(days / 7) + 1}`;
    buckets[key] = (buckets[key] || 0) + e.sales;
  });
  const labels = Object.keys(buckets);
  const values = labels.map(k => Math.round(buckets[k] * 100) / 100);
  return { labels, values };
}

// ── Shared Plotly config ───────────────────────────────────────────────────────

const PLOT_CONFIG = { responsive: true, displayModeBar: false };
const PLOT_STYLE  = { width: '100%' };
const BASE_AXIS   = { tickangle: -45, tickfont: { size: 10 }, gridcolor: '#F5EFE7', linecolor: '#F4A46060' };
const BASE_YAXIS  = { title: { text: 'Sales ($)', standoff: 10, font: { size: 10 } }, gridcolor: '#F5EFE7', tickprefix: '$', tickfont: { size: 10 } };
const BASE_LAYOUT = { paper_bgcolor: '#FFFFFF', plot_bgcolor: '#FDFAF7', font: { family: 'Inter, sans-serif', color: '#2B1F15', size: 11 }, height: 300 };

const PIE_COLORS = ['#8B5A3C', '#F4A460', '#2E8B57', '#DEB887', '#6B4226', '#C48A52'];

// ── Main Component ─────────────────────────────────────────────────────────────

export default function Dashboard({ onAddEntry }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  async function fetchSummary() {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/summary');
      if (!res.ok) throw new Error();
      setSummary(await res.json());
    } catch {
      setError('Could not load data. Is the server running?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSummary(); }, []);

  const today      = todayPrefix();
  const todayEntry = summary?.entries.slice().reverse().find(e => e.date.startsWith(today)) ?? null;

  const chartDates     = summary?.entries.map(e => e.date)      ?? [];
  const chartSales     = summary?.entries.map(e => e.sales)     ?? [];
  const chartCustomers = summary?.entries.map(e => e.customers) ?? [];
  const { labels: weekLabels, values: weekValues } = weeklyBreakdown(summary?.entries ?? []);

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">

      {/* ══ Margin decorations — left column ══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Left — outer strip */}
        <Bean className="anim-float"     style={{ width: 32, height: 42, top: '9%',  left: '0.6%',  opacity: 0.15, transform: 'rotate(22deg)',   animationDelay: '0s'   }} />
        <Bean className="anim-float-alt" style={{ width: 20, height: 26, top: '21%', left: '1.2%',  opacity: 0.11, transform: 'rotate(-38deg)',  animationDelay: '0.9s' }} />
        <Leaf className="anim-float"     style={{ width: 22, height: 37, top: '33%', left: '0.3%',  opacity: 0.14, transform: 'rotate(10deg)',   animationDelay: '1.8s' }} />
        <Bean className="anim-float-alt" style={{ width: 26, height: 34, top: '46%', left: '0.8%',  opacity: 0.12, transform: 'rotate(52deg)',   animationDelay: '0.5s' }} />
        <Bean className="anim-float"     style={{ width: 18, height: 23, top: '59%', left: '1.4%',  opacity: 0.10, transform: 'rotate(-18deg)',  animationDelay: '2.4s' }} />
        <Leaf className="anim-float-alt" style={{ width: 20, height: 33, top: '71%', left: '0.5%',  opacity: 0.12, transform: 'rotate(-8deg)',   animationDelay: '1.1s' }} />
        <Bean className="anim-float"     style={{ width: 28, height: 36, top: '83%', left: '0.9%',  opacity: 0.13, transform: 'rotate(40deg)',   animationDelay: '0.3s' }} />

        {/* Left — inner strip */}
        <Bean className="anim-float-alt" style={{ width: 16, height: 21, top: '15%', left: '4.2%',  opacity: 0.08, transform: 'rotate(65deg)',   animationDelay: '2.1s' }} />
        <Bean className="anim-float"     style={{ width: 20, height: 26, top: '38%', left: '3.8%',  opacity: 0.09, transform: 'rotate(-28deg)',  animationDelay: '0.7s' }} />
        <Leaf className="anim-float-alt" style={{ width: 16, height: 26, top: '60%', left: '4.5%',  opacity: 0.07, transform: 'rotate(20deg)',   animationDelay: '1.6s' }} />
        <Bean className="anim-float"     style={{ width: 14, height: 18, top: '78%', left: '3.5%',  opacity: 0.08, transform: 'rotate(-55deg)',  animationDelay: '2.8s' }} />

        {/* Right — outer strip */}
        <Bean className="anim-float-alt" style={{ width: 30, height: 39, top: '8%',  right: '0.6%', opacity: 0.15, transform: 'rotate(-24deg)',  animationDelay: '0.6s' }} />
        <Leaf className="anim-float"     style={{ width: 22, height: 37, top: '20%', right: '0.4%', opacity: 0.13, transform: 'rotate(-12deg)',  animationDelay: '1.4s' }} />
        <Bean className="anim-float-alt" style={{ width: 22, height: 29, top: '33%', right: '1.1%', opacity: 0.11, transform: 'rotate(44deg)',   animationDelay: '0.2s' }} />
        <Bean className="anim-float"     style={{ width: 28, height: 36, top: '46%', right: '0.7%', opacity: 0.13, transform: 'rotate(-50deg)',  animationDelay: '2.0s' }} />
        <Leaf className="anim-float-alt" style={{ width: 20, height: 33, top: '59%', right: '0.3%', opacity: 0.12, transform: 'rotate(5deg)',    animationDelay: '0.8s' }} />
        <Bean className="anim-float"     style={{ width: 20, height: 26, top: '72%', right: '1.3%', opacity: 0.10, transform: 'rotate(30deg)',   animationDelay: '1.7s' }} />
        <Bean className="anim-float-alt" style={{ width: 32, height: 42, top: '84%', right: '0.6%', opacity: 0.14, transform: 'rotate(-38deg)',  animationDelay: '0.4s' }} />

        {/* Right — inner strip */}
        <Bean className="anim-float"     style={{ width: 16, height: 21, top: '14%', right: '4.2%', opacity: 0.08, transform: 'rotate(-68deg)',  animationDelay: '2.3s' }} />
        <Bean className="anim-float-alt" style={{ width: 20, height: 26, top: '42%', right: '3.8%', opacity: 0.09, transform: 'rotate(32deg)',   animationDelay: '1.0s' }} />
        <Leaf className="anim-float"     style={{ width: 16, height: 26, top: '63%', right: '4.6%', opacity: 0.07, transform: 'rotate(-18deg)',  animationDelay: '0.1s' }} />
        <Bean className="anim-float-alt" style={{ width: 14, height: 18, top: '80%', right: '3.5%', opacity: 0.08, transform: 'rotate(58deg)',   animationDelay: '2.6s' }} />
      </div>

      {/* ── Header ── */}
      <PageHeader
        right={
          <button
            onClick={onAddEntry}
            className="shrink-0 px-5 py-2.5 bg-burnt text-white text-sm font-semibold rounded-xl
                       hover:bg-burnt-dark active:scale-95 transition-all duration-150
                       shadow-warm hover:shadow-warm-md"
          >
            + Add Entry
          </button>
        }
      />

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6 relative z-10">

        {loading && (
          <div className="text-center py-20 text-espresso/40 font-medium">
            Loading your coffee data…
          </div>
        )}

        {error && (
          <div className="bg-burnt/10 border border-burnt/20 text-burnt-dark text-sm font-medium px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {!loading && !error && summary && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Today's Sales"
                value={todayEntry ? `$${fmt(todayEntry.sales)}` : '—'}
                sub={todayEntry ? `${todayEntry.customers} customers today` : 'No entry logged yet'}
                icon={<CalendarIcon />}
                accent="burnt"
                delay={0.05}
              />
              <StatCard
                label="All-Time Sales"
                value={`$${fmt(summary.totalSales)}`}
                sub={`${summary.entries.length} days logged`}
                icon={<SalesIcon />}
                accent="burnt"
                delay={0.1}
              />
              <StatCard
                label="Total Customers"
                value={summary.totalCustomers.toLocaleString()}
                sub={`avg ${summary.entries.length > 0 ? Math.round(summary.totalCustomers / summary.entries.length) : 0} per day`}
                icon={<CustomersIcon />}
                accent="sage"
                delay={0.15}
              />
            </div>

            {/* Charts — side by side on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Chart 1: Sales + Customers dual-axis line */}
              <ChartCard
                title="Sales & Customers Over Time"
                subtitle="Sales ($) on left axis · Customers on right"
                delay={0.18}
              >
                <Plot
                  data={[
                    {
                      x: chartDates, y: chartSales,
                      type: 'scatter', mode: 'lines+markers',
                      name: 'Sales ($)',
                      line:   { color: '#8B5A3C', width: 2.5 },
                      marker: { color: '#8B5A3C', size: 5 },
                      yaxis: 'y',
                    },
                    {
                      x: chartDates, y: chartCustomers,
                      type: 'scatter', mode: 'lines+markers',
                      name: 'Customers',
                      line:   { color: '#2E8B57', width: 2.5, dash: 'dot' },
                      marker: { color: '#2E8B57', size: 5 },
                      yaxis: 'y2',
                    },
                  ]}
                  layout={{
                    ...BASE_LAYOUT,
                    margin: { l: 65, r: 70, t: 55, b: 90 },
                    legend: {
                      orientation: 'h',
                      x: 0.5, xanchor: 'center',
                      y: 1.0, yanchor: 'bottom',
                      bgcolor: 'transparent',
                      font: { size: 11 },
                    },
                    xaxis:  { ...BASE_AXIS },
                    yaxis:  { ...BASE_YAXIS },
                    yaxis2: {
                      title:      { text: 'Customers', standoff: 10, font: { size: 10 } },
                      overlaying: 'y', side: 'right',
                      tickfont:   { size: 10 },
                      gridcolor:  'transparent',
                    },
                    hovermode: 'x unified',
                  }}
                  config={PLOT_CONFIG}
                  style={PLOT_STYLE}
                  useResizeHandler
                />
              </ChartCard>

              {/* Chart 2: Weekly Sales — donut pie chart */}
              <ChartCard
                title="Weekly Sales Distribution"
                subtitle="Each slice shows one week's share of total revenue"
                delay={0.22}
              >
                <Plot
                  data={[
                    {
                      type: 'pie',
                      labels: weekLabels,
                      values: weekValues,
                      hole: 0.44,
                      textinfo: 'label+percent',
                      textposition: 'outside',
                      automargin: true,
                      textfont: { size: 11, family: 'Inter, sans-serif', color: '#2B1F15' },
                      marker: {
                        colors: PIE_COLORS,
                        line: { color: '#FFFFFF', width: 2.5 },
                      },
                      pull: weekLabels.map(() => 0.03),
                      hovertemplate: '<b>%{label}</b><br>Sales: $%{value:,.2f}<br>Share: %{percent}<extra></extra>',
                    },
                  ]}
                  layout={{
                    ...BASE_LAYOUT,
                    height: 310,
                    margin: { l: 30, r: 30, t: 30, b: 30 },
                    showlegend: false,
                    annotations: [
                      {
                        text: '<b>Weekly</b><br>Sales',
                        x: 0.5, y: 0.5,
                        xanchor: 'center', yanchor: 'middle',
                        font: { size: 13, color: '#2B1F15', family: 'Inter, sans-serif' },
                        showarrow: false,
                      },
                    ],
                  }}
                  config={PLOT_CONFIG}
                  style={PLOT_STYLE}
                  useResizeHandler
                />
              </ChartCard>
            </div>

            {/* Recent entries table */}
            {summary.entries.length > 0 && (
              <div
                className="bg-white rounded-2xl shadow-warm border border-cream/80 overflow-hidden anim-fade-in-up"
                style={{ animationDelay: '0.26s' }}
              >
                <div className="px-6 py-4 border-b border-cream flex items-center gap-2.5">
                  <div className="w-1.5 h-5 rounded-full bg-burnt" />
                  <h2 className="text-[15px] font-semibold text-espresso">Recent Entries</h2>
                  <span className="ml-auto text-[11px] text-espresso/35 font-medium">
                    Last {Math.min(summary.entries.length, 10)} of {summary.entries.length}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-cream/50">
                        <th className="px-6 py-3 text-left text-[10px] font-bold text-espresso/40 uppercase tracking-[0.1em]">Date & Time</th>
                        <th className="px-6 py-3 text-right text-[10px] font-bold text-espresso/40 uppercase tracking-[0.1em]">Sales</th>
                        <th className="px-6 py-3 text-right text-[10px] font-bold text-espresso/40 uppercase tracking-[0.1em]">Customers</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream/70">
                      {[...summary.entries].reverse().slice(0, 10).map(entry => (
                        <tr key={entry.id} className="hover:bg-cream/30 transition-colors duration-100">
                          <td className="px-6 py-3 text-espresso font-medium tabular-nums">
                            {entry.date.replace('T', ' · ')}
                          </td>
                          <td className="px-6 py-3 text-right font-bold text-burnt tabular-nums">
                            ${fmt(entry.sales)}
                          </td>
                          <td className="px-6 py-3 text-right font-semibold text-sage tabular-nums">
                            {entry.customers}
                          </td>
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
