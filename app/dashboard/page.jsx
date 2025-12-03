"use client";

import React from "react";
import StatCard from "@/components/StatCard";
import ChartCard from "@/components/ChartCard";
import IncidentsByTypeChart from "@/components/IncidentsByTypeChart";
import ResponseTimeChart from "@/components/ResponseTimeChart";
import dynamic from "next/dynamic";
import { Users, Activity, AlertTriangle, Truck } from "lucide-react";

const MapBox = dynamic(() => import("@/components/MapBox"), { ssr: false });

export default function Page() {
  const [seed, setSeed] = React.useState(null);
  const [kpis, setKpis] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/seed").then((r) => r.json()),
      fetch("/api/kpis").then((r) => r.json()),
    ]).then(([s, k]) => {
      setSeed(s);
      setKpis(k);
    });
  }, []);

  if (!seed || !kpis)
    return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* KPIs */}
      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Guards on Duty" value={seed.company.guards_on_duty} subtitle="Active" icon={<Users />} />
        <StatCard title="Sites Monitored" value={seed.sites.length} subtitle="Total Sites" icon={<Activity />} />
        <StatCard title="Incidents (24h)" value={seed.incidents.length} subtitle="Last 24h" icon={<AlertTriangle />} />
        <StatCard title="Vehicles Active" value={seed.fleet.length} subtitle="Fleet" icon={<Truck />} />
      </div>

      {/* Map + Charts */}
      <div className="xl:col-span-2 card p-4 flex flex-col gap-4">
        <div className="text-sm font-semibold">Live Site Map</div>
        <div className="w-full h-[350px] rounded-lg overflow-hidden">
          <MapBox sites={seed.sites} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartCard title="Incidents by Type">
            <IncidentsByTypeChart incidents={seed.incidents} />
          </ChartCard>

          <ChartCard title="Response Times">
            <ResponseTimeChart incidents={seed.incidents} />
          </ChartCard>
        </div>
      </div>

      {/* Activity */}
      <div className="card p-4">
        <div className="text-sm font-semibold mb-2">Activity & Insights</div>
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            AI Insight: {seed.ai_insights?.[0]?.title || "—"}
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            Top Risk: {kpis.predictive.risks[0].name}
          </div>
        </div>
      </div>

    </div>
  );
}
