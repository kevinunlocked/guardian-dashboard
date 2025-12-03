"use client";
import { usePathname } from "next/navigation";
import { FiHome, FiMap, FiActivity, FiSettings } from "react-icons/fi";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
  { name: "Map", href: "/dashboard/map", icon: <FiMap /> },
  { name: "Incidents", href: "/dashboard/incidents", icon: <FiActivity /> },
  { name: "Settings", href: "/dashboard/settings", icon: <FiSettings /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-[#0A1020]/70 backdrop-blur-xl border-r border-white/5 p-6">
      <h1 className="text-xl font-bold mb-8">🛡 Guardian</h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <a
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active ? "bg-indigo-600 text-white" : "hover:bg-white/5 text-slate-300"}
              `}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
