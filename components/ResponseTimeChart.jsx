"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ResponseTimeChart({ incidents }) {
  const data = (incidents || []).map((i, idx) => ({
    name: `Incident ${idx + 1}`,
    minutes: i.response_time,
  }));

  return (
    <LineChart width={300} height={250} data={data}>
      <XAxis dataKey="name" stroke="#64748b" />
      <YAxis stroke="#64748b" />
      <Tooltip />
      <Line type="monotone" dataKey="minutes" stroke="#7c3aed" strokeWidth={2} />
    </LineChart>
  );
}
