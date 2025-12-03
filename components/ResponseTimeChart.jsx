"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ResponseTimeChart({ incidents = [] }) {
  const data = incidents.map((i) => ({
    name: i.site,
    value: i.response_time_minutes,
  }));

  return (
    <LineChart width={260} height={200} data={data}>
      <XAxis dataKey="name" hide />
      <YAxis hide />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} />
    </LineChart>
  );
}
