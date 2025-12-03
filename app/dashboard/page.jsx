import StatCard from "../../components/StatCard.jsx";
import ChartCard from "../../components/ChartCard.jsx";
import ResponseTimeChart from "../../components/ResponseTimeChart.jsx";
import IncidentsByTypeChart from "../../components/IncidentsByTypeChart.jsx";
import MapBox from "../../components/MapBox.jsx";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* KPI CARDS */}
      <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Incidents" value="42" subtitle="Live monitoring" />
        <StatCard title="AVG Response Time" value="4.3m" subtitle="Last 24 hours" />
        <StatCard title="Dispatchers Online" value="17" subtitle="Real-time" />
        <StatCard title="Priority Alerts" value="6" subtitle="Critical level" />
      </div>

      {/* MAP */}
      <div className="xl:col-span-1">
        <MapBox />
      </div>

      {/* CHARTS */}
      <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Incident Types Distribution">
          <IncidentsByTypeChart />
        </ChartCard>

        <ChartCard title="Avg Response Time Trends">
          <ResponseTimeChart />
        </ChartCard>
      </div>
    </div>
  );
}
