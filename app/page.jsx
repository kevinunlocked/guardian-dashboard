"use client";
import React from "react";

import dynamic from "next/dynamic";
import { Users, Activity, AlertTriangle, Truck } from "lucide-react";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import IncidentsByTypeChart from "../components/IncidentsByTypeChart";
import ResponseTimeChart from "../components/ResponseTimeChart";
import RightPanel from "../components/RightPanel";

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
    <div className="flex min-h-screen bg-[#0b0b0f] text-white">
      
      {/* RIGHT PANEL */}
      <aside className="hidden xl:block w-[320px] border-r border-white/5 bg-black/20 backdrop-blur p-4">
        <RightPanel />
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-6 space-y-6">
        
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Guardian Dashboard</h1>
            <p className="text-slate-400 text-sm">Real-time operations center</p>
          </div>

          <div className="flex gap-3">
            <button className="small-btn">Share</button>
            <button className="btn">AI Assist</button>
          </div>
        </header>

        {/* KPI GRID */}
        <section>
          <h2 className="section-title">Key Metrics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Guards on duty"
              value={seed.company?.guards_on_duty}
              subtitle="Active guards now"
              icon={<Users size={18} />}
            />
            <StatCard
              title="Sites monitored"
              value={seed.sites?.length}
              subtitle="Total sites"
              icon={<Activity size={18} />}
            />
            <StatCard
              title="Incidents (24h)"
              value={seed.incidents?.length}
              subtitle="Last 24 hours"
              icon={<AlertTriangle size={18} />}
            />
            <StatCard
              title="Vehicles active"
              value={(seed.fleet || []).length}
              subtitle="Patrols & assets"
              icon={<Truck size={18} />}
            />
          </div>
        </section>

        {/* MAP + CHARTS */}
        <section>
          <h2 className="section-title">Live Operations</h2>

          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">

            {/* MAP */}
            <div className="card 2xl:col-span-2 flex flex-col gap-4">
              <div className="font-semibold text-sm">Live Site Map</div>
              <div className="w-full h-[400px] rounded-lg overflow-hidden">
                <MapBox
                  sites={seed.sites}
                  risks={kpis?.predictive?.risks}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard title="Incidents by Type">
                  <IncidentsByTypeChart incidents={seed.incidents} />
                </ChartCard>

                <ChartCard title="Response Times">
                  <ResponseTimeChart incidents={seed.incidents} />
                </ChartCard>
              </div>
            </div>

            {/* ACTIVITY FEED */}
            <div className="card flex flex-col gap-4">
              <div className="font-semibold text-sm">Activity & Insights</div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5">
                  AI Insight: {seed.ai_insights?.[0]?.title || "—"}
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  Top risk site: {kpis?.predictive?.risks?.[0]?.name || "—"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPORTS */}
        <section>
          <h2 className="section-title">Reports</h2>

          <div className="card flex gap-2">
            <button className="small-btn">Export PDF</button>
            <button className="small-btn">Export CSV</button>
            <button className="small-btn">Send to Client</button>
          </div>
        </section>
      </main>
    </div>
  );
}
