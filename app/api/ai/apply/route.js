let history = []

export async function POST(req){
  try{
    const body = await req.json().catch(()=>({}))
    const entry = { suggestion: body.suggestion || null, ts: new Date().toISOString() }
    history.unshift(entry)
    return new Response(JSON.stringify({ ok:true, entry }), { status:200, headers:{ 'Content-Type':'application/json' } })
  }catch(e){
    return new Response(JSON.stringify({ error: e.message }), { status:500, headers:{ 'Content-Type':'application/json' } })
  }
}

export async function GET(){
  return new Response(JSON.stringify({ history }), { status:200, headers:{ 'Content-Type':'application/json' } })
}
