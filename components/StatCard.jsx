export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center'}}>
        <div className="kpi-icon" aria-hidden>{icon}</div>
        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {subtitle && <div style={{fontSize:12,color:'var(--muted)'}}>{subtitle}</div>}
        </div>
      </div>
      <div style={{opacity:0.9}}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  )
}
