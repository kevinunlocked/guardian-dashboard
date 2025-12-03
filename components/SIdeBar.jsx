"use client";

import { Shield, LayoutDashboard, Bell, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-panel backdrop-blur-xl border-r border-white/10 h-screen fixed left-0 top-0 p-6 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <Shield className="text-indigo-400" size={28} />
        <span className="text-xl font-semibold text-white">Guardian</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 text-slate-300">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/alerts" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
          <Bell size={20} />
          Alerts
        </Link>

        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition">
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
