"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Fire", value: 22 },
  { name: "Medical", value: 18 },
  { name: "Violence", value: 30 },
  { name: "Accident", value: 14 },
];

export default function IncidentsByTypeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={80} label>
          {data.map((_, i) => (
            <Cell key={i} fill={["#6366F1", "#0EA5E9", "#10B981", "#F59E0B"][i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
