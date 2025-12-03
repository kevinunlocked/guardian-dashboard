export default function RightPanel({ seed, kpis }) {
  return (
    <div className="card p-4 h-screen overflow-y-auto">

      <div className="text-lg font-semibold mb-4">AI Insights</div>

      <div className="space-y-4">

        <div className="p-3 bg-white/5 rounded-lg text-sm">
          {seed.ai_insights?.[0]?.title || "No AI insights available"}
        </div>

        <div className="p-3 bg-white/5 rounded-lg text-sm">
          Top risk site: {kpis?.predictive?.risks?.[0]?.name || "—"}
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Recent Alerts</div>
          <div className="space-y-2 text-xs text-slate-400">
            {seed.logs?.slice(0, 5).map((log, i) => (
              <div key={i} className="bg-white/5 rounded p-2">
                {log.message}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
