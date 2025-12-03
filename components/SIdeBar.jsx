"use client";

import { Home, Map, BarChart3, FileText, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
    { name: "Map", icon: <Map size={18} />, href: "/dashboard/map" },
    { name: "Analytics", icon: <BarChart3 size={18} />, href: "/dashboard/analytics" },
    { name: "Reports", icon: <FileText size={18} />, href: "/dashboard/reports" },
    { name: "Settings", icon: <Settings size={18} />, href: "/dashboard/settings" },
  ];

  return (
    <div className="h-full flex flex-col p-5">
      <div className="text-xl font-bold text-indigo-400 tracking-wide mb-8">
        Guardian
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto text-slate-500 text-xs px-4 pt-6">
        Guardian Ops v1.0.0
      </div>
    </div>
  );
}
