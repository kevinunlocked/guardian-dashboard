'use client'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function IncidentsByTypeChart({ incidents }) {
  const counts = {}
  incidents?.forEach(i => { const t = i.type || 'Unknown'; counts[t] = (counts[t]||0)+1 })
  const labels = Object.keys(counts); const values = Object.values(counts)
  return <div style={{width:'100%',height:200}}><Bar data={{ labels, datasets:[{ label:'Incidents', data: values, backgroundColor:'rgba(56,189,248,0.8)' }] }} options={{ plugins:{ legend:{ display:false } } }} /></div>
}
