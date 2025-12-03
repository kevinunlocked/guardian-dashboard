"use client";

export default function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="card flex items-center justify-between gap-4">
      <div>
        <div className="text-sm text-slate-400">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value ?? "—"}</div>
        <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
      </div>

      <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
