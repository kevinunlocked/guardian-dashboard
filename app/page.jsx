'use client'
import useSWR from 'swr'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import MapBox from '../components/MapBox'
import IncidentsByTypeChart from '../components/IncidentsByTypeChart'
import ResponseTimeChart from '../components/ResponseTimeChart'
import RightPanel from '../components/RightPanel'

const fetcher = url => fetch(url).then(r=>r.json())

function IconGuards(){ return (<svg width='20' height='20' viewBox='0 0 24 24' fill='none'><path d='M12 12a4 4 0 100-8 4 4 0 000 8z' stroke='#04111a' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'/></svg>) }
function IconSites(){ return (<svg width='20' height='20' viewBox='0 0 24 24' fill='none'><path d='M3 21h18' stroke='#04111a' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'/></svg>) }
function IconIncidents(){ return (<svg width='20' height='20' viewBox='0 0 24 24' fill='none'><path d='M12 2v10' stroke='#04111a' strokeWidth='1.2' strokeLinecap='round' strokeLinejoin='round'/><circle cx='12' cy='18' r='2' stroke='#04111a' strokeWidth='1.2' /></svg>) }
function IconVehicles(){ return (<svg width='20' height='20' viewBox='0 0 24 24' fill='none'><rect x='3' y='11' width='18' height='6' rx='2' stroke='#04111a' strokeWidth='1.2'/></svg>) }

export default function Page(){
  const { data: seed, error } = useSWR('/api/seed', fetcher)
  const { data: kpis } = useSWR('/api/kpis', fetcher, { revalidateOnFocus:false })

  if(error) return <div style={{padding:20,color:'#f87171'}}>Failed to load data</div>
  if(!seed) return <div style={{padding:20,color:'#94a3b8'}}>Loading…</div>

  const guardsOnDuty = seed.company?.guards_on_duty ?? 0
  const sites = seed.sites?.length ?? 0
  const incidents24 = seed.incidents?.length ?? 0
  const vehicles = seed.fleet?.length ?? 0

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      <header className='header'>
        <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{fontWeight:800,fontSize:18,color:'var(--accent-from)'}}>Guardian</div><div style={{color:'var(--muted)'}}>Operations Dashboard</div></div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className='small-btn'>Share</button>
          <button className='btn'>AI Assist</button>
        </div>
      </header>

      <div className='container'>
        <main className='main'>
          <div className='layout-grid'>
            <div className='card' style={{gridColumn:'span 4'}}>
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
              <div className='kpi-row'>
                <StatCard title='Guards on duty' value={guardsOnDuty} subtitle='Active guards now' icon={<IconGuards/>} />
                <StatCard title='Sites monitored' value={sites} subtitle='Total sites' icon={<IconSites/>} />
                <StatCard title='Incidents (24h)' value={incidents24} subtitle='Last 24 hours' icon={<IconIncidents/>} />
                <StatCard title='Vehicles active' value={vehicles} subtitle='Patrols & assets' icon={<IconVehicles/>} />
              </div>
            </div>

            <div className='card' style={{gridColumn:'span 2'}}>
              <div className='grid-2-1' style={{height:420}}>
                <div className='map-card'><div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Live Site Map</div><MapBox sites={seed.sites} risks={kpis?.predictive?.risks} /></div>
                <div style={{display:'flex',flexDirection:'column',gap:16}}>
                  <ChartCard title='Incidents by Type'><IncidentsByTypeChart incidents={seed.incidents} /></ChartCard>
                  <ChartCard title='Response times'><ResponseTimeChart incidents={seed.incidents} /></ChartCard>
                </div>
              </div>
            </div>

            <div className='card' style={{gridColumn:'span 2'}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Activity & Insights</div>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)'}}>AI Insight: {seed.ai_insights?.[0]?.title}</div>
                <div style={{padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)'}}>Top risk site: {kpis?.predictive?.risks?.[0]?.name || '—'}</div>
              </div>
            </div>

            <div className='card' style={{gridColumn:'span 4'}}>
              <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>Reports & Exports</div>
              <div style={{display:'flex',gap:8}}>
                <button className='small-btn'>Export PDF</button>
                <button className='small-btn'>Export CSV</button>
                <button className='small-btn'>Send to Client</button>
              </div>
            </div>

          </div>
        </main>

        <aside className='right-panel'>
          <RightPanel />
        </aside>
      </div>

    </div>
  )
}
