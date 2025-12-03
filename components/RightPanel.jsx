'use client'
import { useEffect, useState } from 'react'

export default function RightPanel(){ 
  const [kpis, setKpis] = useState(null)
  const [seed, setSeed] = useState(null)
  const [suggestions, setSuggestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState([])

  useEffect(()=>{ 
    async function load(){
      try{
        const [kres, sres] = await Promise.all([fetch('/api/kpis'), fetch('/api/seed')])
        const kd = await kres.json().catch(()=>null)
        const sd = await sres.json().catch(()=>null)
        setKpis(kd); setSeed(sd)
      }catch(e){ console.error(e) }
    }
    load()
  },[])

  async function runAnalyze(){
    setLoading(true)
    try{
      const res = await fetch('/api/ai/analyze', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ notes: 'Generate roster and risk suggestions.' }) })
      const data = await res.json()
      setSuggestions(data.suggestions || data)
    }catch(e){ console.error(e) }
    setLoading(false)
  }

  async function applySuggestion(sugg){
    try{
      if(sugg?.changes && seed){
        const newSeed = JSON.parse(JSON.stringify(seed))
        if(sugg.changes.guardId && sugg.changes.toSite){
          const g = newSeed.guards.find(x=>x.id===sugg.changes.guardId)
          if(g){ g.assigned_site = sugg.changes.toSite; g.status='On Duty' }
        }
        if(sugg.changes.addGuards && sugg.changes.site){
          for(let i=0;i<sugg.changes.addGuards;i++){
            const id = 'GX'+Math.floor(Math.random()*900+100)
            newSeed.guards.push({ id, name: 'Auto-'+id, status:'On Duty', assigned_site: sugg.changes.site, performance_score:75 })
          }
        }
        setSeed(newSeed)
      }
      const res = await fetch('/api/ai/apply', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ suggestion: sugg }) })
      const data = await res.json().catch(()=>null)
      if(data?.ok){ setApplied(prev=>[data.entry,...prev]) }
    }catch(e){ console.error(e) }
  }

  return (
    <aside className="right-panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:800,fontSize:18,color:'var(--accent-from)'}}>Fuse AI</div>
        <div style={{fontSize:12,color:'var(--muted)'}}>v1.2 demo</div>
      </div>

      <div style={{marginTop:12,fontSize:13,color:'var(--muted)'}}>KPI Summary</div>
      {kpis ? (
        <div style={{marginTop:12,display:'grid',gap:8}}>
          <div style={{fontSize:13,color:'#cfe'}}>Coverage: <b style={{marginLeft:6}}>{kpis.scheduling.coverage}%</b></div>
          <div style={{fontSize:13,color:'#cfe'}}>Absenteeism: <b style={{marginLeft:6}}>{kpis.scheduling.absenteeism_rate}%</b></div>
          <div style={{fontSize:13,color:'#cfe'}}>Report Quality: <b style={{marginLeft:6}}>{kpis.performance.report_quality}%</b></div>
        </div>
      ) : <div style={{color:'var(--muted)',marginTop:8}}>Loading...</div>}

      <div style={{marginTop:16, display:'flex', gap:8}}>
        <button className="btn" onClick={runAnalyze}>{loading ? 'Analyzing…' : 'Run AI Analyze'}</button>
        <button className="small-btn" onClick={async ()=>{ const res = await fetch('/api/ai/apply'); const d = await res.json(); setApplied(d.history || []) }}>History</button>
      </div>

      {suggestions && (
        <div style={{marginTop:12}}>
          <div style={{fontSize:13,color:'#9fb0c8',marginBottom:8}}>Suggestions</div>
          {Array.isArray(suggestions.scheduling) && suggestions.scheduling.map((s)=>(
            <div key={s.id||JSON.stringify(s)} style={{padding:10,marginBottom:8,borderRadius:8,background:'rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div><b>{s.action}</b><div style={{fontSize:13,color:'var(--muted)'}}>{s.reason}</div></div>
                <div style={{display:'flex',gap:8}}>
                  <button className="small-btn" onClick={()=>applySuggestion(s)}>Apply</button>
                  <button className="small-btn" onClick={()=>{ setSuggestions(prev=>{ const ns = {...prev}; ns.scheduling = ns.scheduling.filter(x=>x.id!==s.id); return ns }) }}>Reject</button>
                </div>
              </div>
            </div>
          ))}

          {suggestions.summary && <div style={{fontSize:13,color:'#cbd5e1',marginTop:8}}>Summary: {suggestions.summary}</div>}
        </div>
      )}

      {seed && (
        <div style={{marginTop:14}}>
          <div style={{fontSize:13,color:'var(--muted)'}}>Local roster (preview)</div>
          <div style={{maxHeight:160,overflow:'auto',marginTop:8}}>
            {seed.guards.map(g=> <div key={g.id} style={{display:'flex',justifyContent:'space-between',padding:8,borderRadius:8,background:'rgba(255,255,255,0.01)',marginBottom:6}}><div><b>{g.name}</b><div style={{fontSize:12,color:'var(--muted)'}}>Site: {g.assigned_site || '—'}</div></div><div style={{fontSize:12,color:'#cfe'}}>{g.status}</div></div>)}
          </div>
        </div>
      )}

      {applied.length>0 && (
        <div style={{marginTop:12}}>
          <div style={{fontSize:12,color:'var(--muted)'}}>Applied</div>
          {applied.map((a,i)=> <div key={i} style={{fontSize:12,color:'#dbeafe',marginTop:6}}>• {a.entry.suggestion?.action || JSON.stringify(a.entry.suggestion)} — {new Date(a.entry.ts).toLocaleString()}</div>)}
        </div>
      )}
    </aside>
  )
}
