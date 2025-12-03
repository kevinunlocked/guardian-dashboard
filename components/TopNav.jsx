"use client";
import { Bell, Search } from "lucide-react";

export default function TopNav() {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      
      <div className="text-sm text-slate-400">Operations Dashboard</div>

      <div className="flex items-center gap-4">

        <div className="relative">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            placeholder="Search..."
            className="pl-10 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-white/10">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-500 text-center text-sm font-semibold flex items-center justify-center">
          K
        </div>

      </div>
    </div>
  );
}
