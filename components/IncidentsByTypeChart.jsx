"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function IncidentsByTypeChart({ incidents }) {
  const data = (incidents || []).reduce((acc, inc) => {
    acc[inc.type] = (acc[inc.type] || 0) + 1;
    return acc;
  }, {});

  const formatted = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  const COLORS = ["#7c3aed", "#06b6d4", "#eab308", "#ef4444"];

  return (
    <PieChart width={250} height={250}>
      <Pie data={formatted} dataKey="value" outerRadius={90}>
        {formatted.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
