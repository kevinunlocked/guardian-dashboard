'use client'
import React from "react";
import { motion } from 'framer-motion'

export default function StatCard({ title, value, subtitle, icon = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
        className="card flex items-center justify-between"
      style={{ padding: 16 }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginRight: 10, background: 'linear-gradient(135deg, var(--accent-from), var(--accent-to))', color: '#071026', boxShadow: '0 6px 18px rgba(2,6,23,0.6)' }} aria-hidden>
          {icon}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{title}</div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>{value}</div>
          {subtitle && <div style={{ fontSize: 12, marginTop: 4, color: 'var(--muted)' }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ opacity: 0.9 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </motion.div>
  )
}
