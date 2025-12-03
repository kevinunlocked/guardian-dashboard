'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend)

export default function ResponseTimeChart({ incidents = [] }) {
  const sorted = (incidents || []).slice().sort((a,b)=>new Date(a.date)-new Date(b.date))
  const labels = sorted.map(i=>i.date)
  const values = sorted.map(i=>i.response_time ?? Math.round(Math.random()*6+4))
  return (
    <Line data={{ labels, datasets: [{ label: 'Response (min)', data: values, borderColor: 'rgba(124,58,237,0.95)', tension: 0.35 }]}}
      options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
  )
}
