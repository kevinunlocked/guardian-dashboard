'use client'
import dynamic from 'next/dynamic'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import IncidentsByTypeChart from '../components/IncidentsByTypeChart'
import ResponseTimeChart from '../components/ResponseTimeChart'
import RightPanel from '../components/RightPanel'
import { Activity, Users, AlertTriangle, Truck } from 'lucide-react'

const MapBox = dynamic(() => import('../components/MapBox'), { ssr: false })

export default function Page() {
  // fetch with SWR or simple fetch; keep it simple for demo:
  const [seed, setSeed] = React.useState(null)
  const [kpis, setKpis] = React.useState(null)

  React.useEffect(()=>{
    Promise.all([fetch('/api/seed').then(r=>r.json()), fetch('/api/kpis').then(r=>r.json())])
      .then(([s,k])=>{ setSeed(s); setKpis(k) })
      .catch(()=>{})
  },[])

  if(!seed || !kpis) return <div style={{padding:20,color:'#94a3b8'}}>Loading…</div>

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <header className="header">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{fontWeight:800,fontSize:18,color:'var(--accent-from)'}}>Guardian</div>
          <div style={{color:'var(--muted)'}}>Operations Dashboard</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className="small-btn">Share</button>
          <button className="btn">AI Assist</button>
        </div>
      </header>

      <div className="container">
        <main className="main">
          <div className="layout-grid">
            <div className="card" style={{gridColumn:'span 4'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700}}>Operations Overview</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>Real-time insights · AI-assisted</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <div style={{fontSize:12,color:'var(--muted)'}}>Updated: {new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div style={{gridColumn:'span 4'}}>
              <div className="kpi-row">
                <StatCard title="Guards on duty" value={seed.company?.guards_on_duty} subtitle="Active guards now" icon={<Users size={16}/>}/>
                <StatCard title="Sites monitored" value={seed.sites?.length} subtitle="Total sites" icon={<Activity size={16}/>}/>
                <StatCard title="Incidents (24h)" value={seed.incidents?.length} subtitle="Last 24 hours" icon={<AlertTriangle size={16}/>}/>
                <StatCard title="Vehicles active" value={(seed.fleet || []).length} subtitle="Patrols & assets" icon={<Truck size={16}/>}/>
              </div>
            </div>

            <div className="card" style={{gridColumn:'span 2'}}>
              <div className="grid-2-1" style={{height:420}}>
                <div className="map-card">
                  <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Live Site Map</div>
                  <MapBox sites={seed.sites} risks={kpis?.predictive?.risks} />
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <ChartCard title="Incidents by Type"><IncidentsByTypeChart incidents={seed.incidents} /></ChartCard>
                  <ChartCard title="Response times"><ResponseTimeChart incidents={seed.incidents} /></ChartCard>
                </div>
              </div>
            </div>

            <div className="card" style={{gridColumn:'span 2'}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Activity & Insights</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)'}}>AI Insight: {seed.ai_insights?.[0]?.title || '—'}</div>
                <div style={{padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)'}}>Top risk site: {kpis?.predictive?.risks?.[0]?.name || '—'}</div>
              </div>
            </div>

            <div className="card" style={{gridColumn:'span 4'}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Reports & Exports</div>
              <div style={{display:'flex',gap:8}}>
                <button className="small-btn">Export PDF</button>
                <button className="small-btn">Export CSV</button>
                <button className="small-btn">Send to Client</button>
              </div>
            </div>

          </div>
        </main>

        <aside className="right-panel">
          <RightPanel />
        </aside>
      </div>
    </div>
  )
}
