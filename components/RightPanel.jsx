export default function RightPanel() {
  return (
    <div className="hidden xl:flex flex-col w-72 bg-[#0A1020]/70 backdrop-blur-xl border-l border-white/5 p-6">
      <h2 className="text-lg font-semibold mb-4">Live Alerts</h2>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm font-semibold">🔥 Fire Incident</div>
          <div className="text-xs text-slate-400">3 minutes ago</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm font-semibold">🚨 Theft Report</div>
          <div className="text-xs text-slate-400">9 minutes ago</div>
        </div>
      </div>
    </div>
  );
}
