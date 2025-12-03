"use client";

import React from "react";
import dynamic from "next/dynamic";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import IncidentsByTypeChart from "../../components/IncidentsByTypeChart";
import ResponseTimeChart from "../../components/ResponseTimeChart";
import RightPanel from "../../components/RightPanel";
import { Users, Activity, AlertTriangle, Truck } from "lucide-react";

const MapBox = dynamic(() => import("../../components/MapBox"), { ssr: false });

export default function DashboardPage() {
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
    return <div className="text-slate-400 p-6 text-sm">Loading dashboard…</div>;

  return (
    <div className="flex w-full">
      {/* MAIN */}
      <div className="flex-1 pr-6">
        <div className="space-y-10">

          {/* Title */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            Operations Dashboard
          </h1>

          {/* KPI GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Guards on duty"
              value={seed.company?.guards_on_duty}
              subtitle="Active guards now"
              icon={<Users size={20} />}
            />
            <StatCard
              title="Sites monitored"
              value={seed.sites?.length}
              subtitle="Total sites"
              icon={<Activity size={20} />}
            />
            <StatCard
              title="Incidents (24h)"
              value={seed.incidents?.length}
              subtitle="Last 24 hours"
              icon={<AlertTriangle size={20} />}
            />
            <StatCard
              title="Vehicles active"
              value={seed.fleet?.length}
              subtitle="Patrol units"
              icon={<Truck size={20} />}
            />
          </div>

          {/* MAP + CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <div className="card">
              <div className="font-semibold text-sm mb-3">Live Site Map</div>
              <div className="w-full h-[350px] rounded-lg overflow-hidden">
                <MapBox sites={seed.sites} risks={kpis.predictive.risks} />
              </div>
            </div>

            <div className="space-y-6">
              <ChartCard title="Incidents by Type">
                <IncidentsByTypeChart incidents={seed.incidents} />
              </ChartCard>

              <ChartCard title="Response Times">
                <ResponseTimeChart incidents={seed.incidents} />
              </ChartCard>
            </div>
          </div>

          {/* Reports */}
          <div className="card">
            <div className="font-semibold mb-3">Reports & Exports</div>
            <div className="flex gap-3">
              <button className="small-btn">Export PDF</button>
              <button className="small-btn">Export CSV</button>
              <button className="small-btn">Email Client</button>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <aside className="w-[320px] hidden lg:block">
        <RightPanel seed={seed} kpis={kpis} />
      </aside>
    </div>
  );
}
