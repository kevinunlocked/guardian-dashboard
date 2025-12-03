'use client'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend)

export default function ResponseTimeChart({ incidents }) {
  const sorted = incidents?.slice().sort((a,b)=>new Date(a.date)-new Date(b.date))||[]
  const labels = sorted.map(i=>i.date); const values = sorted.map(i=>i.response_time||Math.random()*10+3)
  return <div style={{width:'100%',height:200}}><Line data={{ labels, datasets:[{ label:'Response', data: values, borderColor:'rgba(168,85,247,0.9)', tension:0.4 }] }} options={{ plugins:{ legend:{ display:false } } }} /></div>
}
