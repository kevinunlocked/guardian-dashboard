import seed from '../../seed.json'

function computeSchedulingKPIs(seed) {
  const guards = seed.guards || []
  const absentPatterns = guards.filter(g => g.name && g.name.toLowerCase().includes('moyo')).length
  const absenteeism_rate = Math.min(20, Math.round((absentPatterns / Math.max(1, guards.length)) * 100))
  const coverage = Math.max(50, Math.round((seed.company?.guards_on_duty || 0) / Math.max(1, seed.sites.length) * 100))
  return { absenteeism_rate, avg_response: seed.company?.avg_response_time_minutes || 0, coverage }
}

function computePerformanceKPIs(seed) {
  const incidents = seed.incidents || []
  const report_quality = Math.max(60, 100 - incidents.length * 2)
  const repeat_issues = incidents.length > 2 ? Math.min(10, incidents.length - 2) : 0
  return { report_quality, repeat_issues }
}

function computeDispatchKPIs(seed) {
  const incidents = seed.incidents || []
  const avg_response = seed.company?.avg_response_time_minutes || 0
  const prioritized = incidents.filter(i => (i.type || '').toLowerCase().includes('intrusion')).length
  return { avg_response, prioritized }
}

function computePredictiveRisk(seed) {
  const siteCounts = {}
  ;(seed.incidents || []).forEach(i => siteCounts[i.site] = (siteCounts[i.site] || 0) + 1)
  const risks = (seed.sites || []).map(s => ({ site_id: s.site_id, name: s.name, risk_score: Math.min(100, (siteCounts[s.site_id] || 0) * 40 + (s.risk_history?.slice(-1)[0]||0)*10) }))
  return { risks }
}

export async function GET() {
  const kpis = {
    scheduling: computeSchedulingKPIs(seed),
    performance: computePerformanceKPIs(seed),
    dispatch: computeDispatchKPIs(seed),
    predictive: computePredictiveRisk(seed),
    financial: { profitability_score: 78, suspected_overtime_abuse: 3 },
    hr: { training_due: 4, certifications_expiring_30d: 2 }
  }
  return new Response(JSON.stringify(kpis), { status:200, headers:{ 'Content-Type':'application/json' } })
}
