Guardian Dashboard — Full project (v1.2)

This project is a demo dashboard with:
- Rebuilt data model (seed.json)
- Gemini AI analyze endpoint (server-side, uses GEMINI_API_KEY)
- AI suggestions UI with accept/reject and apply (in-memory demo persistence)
- Mapbox with fitBounds and color-coded risk markers
- Polished UI: responsive layout, KPI cards, charts

Setup:
1. Create .env.local in project root:
   GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

2. Install dependencies:
   npm install

3. Run development server:
   npm run dev

Notes:
- The Gemini route returns mock suggestions if GEMINI_API_KEY isn't set.
- Do NOT commit your API keys to GitHub.
