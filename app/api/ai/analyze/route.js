import seed from '../../../seed.json'

export async function POST(req){
  try{
    const body = await req.json().catch(()=>({}))
    const notes = body.notes || ''
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    if(!apiKey){
      const suggestions = {
        scheduling: [
          { id: 'sug-1', action: 'Reassign Guard', reason: 'Move G001 to S103 for higher coverage', changes: { guardId: 'G001', toSite: 'S103' } },
          { id: 'sug-2', action: 'Add Night Patrol', reason: 'Elevated night risk at S103', changes: { addGuards: 1, site: 'S103', shift: 'night' } }
        ],
        training: [
          { id: 't-1', action: 'Report Writing', reason: 'Improve incident report completeness' }
        ],
        dispatch: [
          { id: 'd-1', action: 'Prioritize Intrusion', reason: 'Intrusion events show higher severity' }
        ],
        summary: 'Mock analysis: adjust roster at S103 and run targeted training.'
      }
      return new Response(JSON.stringify({ model:'mock', suggestions }), { status:200, headers:{ 'Content-Type':'application/json' } })
    }

    const endpoint = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate'
    const prompt = `You are a security ops analyst. Given the following seed (truncated): ${JSON.stringify(seed).slice(0,2000)}... and notes: ${notes}. Return JSON with keys: scheduling[], training[], dispatch[], summary.`

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 512 })
    })

    if(!resp.ok){
      const txt = await resp.text().catch(()=>null)
      return new Response(JSON.stringify({ error:'Gemini error', details: txt }), { status:502, headers:{ 'Content-Type':'application/json' } })
    }

    const data = await resp.json()
    const candidate = data?.candidates?.[0]?.output || data?.output?.[0]?.content || JSON.stringify(data)
    let parsed = null
    try{ parsed = JSON.parse(candidate) }catch(e){ /* not JSON */ }
    const suggestions = parsed || { raw: candidate }
    return new Response(JSON.stringify({ model:'gemini', suggestions }), { status:200, headers:{ 'Content-Type':'application/json' } })

  }catch(e){
    return new Response(JSON.stringify({ error: e.message }), { status:500, headers:{ 'Content-Type':'application/json' } })
  }
}
