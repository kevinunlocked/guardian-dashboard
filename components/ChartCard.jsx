'use client'
export default function ChartCard({ title, children }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Last 24h</div>
      </div>
      <div style={{ height: 200, minHeight: 160 }}>{children}</div>
    </div>
  )
}
