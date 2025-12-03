"use client";

import { Search } from "lucide-react";

export default function TopNav() {
  return (
    <header className="h-16 border-b border-white/10 bg-panel backdrop-blur-xl ml-64 flex items-center px-6 justify-between">
      
      {/* Search */}
      <div className="relative w-80">
        <Search size={18} className="absolute left-3 top-3 text-slate-400" />
        <input 
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500" />
        <span className="text-sm text-slate-300">Kevin</span>
      </div>
    </header>
  );
}
