"use client";
import { PieChart, Pie, Tooltip } from "recharts";

export default function IncidentsByTypeChart({ incidents = [] }) {
  const data = Object.values(
    incidents.reduce((acc, i) => {
      acc[i.type] = acc[i.type] || { name: i.type, value: 0 };
      acc[i.type].value++;
      return acc;
    }, {})
  );

  return (
    <PieChart width={250} height={200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={80}
        fill="#6366f1"
      />
      <Tooltip />
    </PieChart>
  );
}
