export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
    </div>
  );
}
