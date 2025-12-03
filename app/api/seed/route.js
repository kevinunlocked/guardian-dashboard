import seed from '../../seed.json'

export async function GET() {
  return new Response(JSON.stringify(seed), { status:200, headers:{ 'Content-Type':'application/json' } })
}
