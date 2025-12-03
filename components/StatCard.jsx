'use client'
import { motion } from 'framer-motion'

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="card flex items-center justify-between"
      style={{ padding: 16 }}
    >
      <div className="flex items-center">
        <div className="kpi-icon mr-4" aria-hidden>
          {icon}
        </div>
        <div>
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {subtitle && <div className="text-[12px] mt-1" style={{ color: 'var(--muted)' }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ opacity: 0.9 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </motion.div>
  )
}
