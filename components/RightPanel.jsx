"use client";

export default function RightPanel() {
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="text-sm font-semibold text-slate-300">
        Live Notifications
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm">
        • Patrol unit Alpha-3 reported in.
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm">
        • Camera #14 detected motion.
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm">
        • AI analysis completed for Site Delta.
      </div>
    </div>
  );
}
