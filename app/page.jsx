"use client";
import React from "react";
import dynamic from "next/dynamic";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import IncidentsByTypeChart from "../components/IncidentsByTypeChart";
import ResponseTimeChart from "../components/ResponseTimeChart";
import RightPanel from "../components/RightPanel";

import { Activity, Users, AlertTriangle, Truck } from "lucide-react";

const MapBox = dynamic(() => import("../components/MapBox"), { ssr: false });

export default function Page() {
  const [seed, setSeed] = React.useState(null);
  const [kpis, setKpis] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/seed").then((r) => r.json()),
      fetch("/api/kpis").then((r) => r.json()),
    ])
      .then(([s, k]) => {
        setSeed(s);
        setKpis(k);
      })
      .catch(() => {});
  }, []);

  if (!seed || !kpis)
    return <div className="p-6 text-slate-400 text-sm">Loading…</div>;

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="font-extrabold text-lg text-indigo-400">Guardian</div>
          <div className="text-slate-400 text-sm">Operations Dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="small-btn">Share</button>
          <button className="btn">AI Assist</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex w-full">

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Overview */}
            <div className="col-span-full card">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-base">Operations Overview</div>
                  <div className="text-sm text-slate-400">Real-time insights · AI-assisted</div>
                </div>

                <div className="text-xs text-slate-500">
                  Updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Guards on duty" value={seed.company.guards_on_duty} subtitle="Active guards now" icon={<Users size={16}/>}/>
              <StatCard title="Sites monitored" value={seed.sites.length} subtitle="Total sites" icon={<Activity size={16}/>}/>
              <StatCard title="Incidents (24h)" value={seed.incidents.length} subtitle="Last 24 hours" icon={<AlertTriangle size={16}/>}/>
              <StatCard title="Vehicles active" value={(seed.fleet || []).length} subtitle="Patrols & assets" icon={<Truck size={16}/>}/>
            </div>

            {/* MAP + CHARTS */}
            <div className="xl:col-span-2 card flex flex-col gap-4">
              <div className="font-semibold text-sm">Live Site Map</div>
              <div className="w-full h-[350px] rounded-lg overflow-hidden">
                <MapBox sites={seed.sites} risks={kpis.predictive.risks}/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard title="Incidents by Type">
                  <IncidentsByTypeChart incidents={seed.incidents}/>
                </ChartCard>

                <ChartCard title="Response Times">
                  <ResponseTimeChart incidents={seed.incidents}/>
                </ChartCard>
              </div>
            </div>

            {/* ACTIVITY */}
            <div className="xl:col-span-2 card">
              <div className="font-semibold text-sm mb-2">Activity & Insights</div>

              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  AI Insight: {seed.ai_insights?.[0]?.title || "—"}
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  Top risk site: {kpis.predictive.risks?.[0]?.name || "—"}
                </div>
              </div>
            </div>

            {/* EXPORTS */}
            <div className="col-span-full card">
              <div className="font-semibold text-sm mb-2">Reports & Exports</div>

              <div className="flex gap-2">
                <button className="small-btn">Export PDF</button>
                <button className="small-btn">Export CSV</button>
                <button className="small-btn">Send to Client</button>
              </div>
            </div>

          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="hidden lg:block w-[320px] border-l border-white/10 bg-black/20 p-4 backdrop-blur">
          <RightPanel/>
        </aside>

      </div>
    </div>
  );
}
