"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "1 AM", val: 4.2 },
  { time: "3 AM", val: 5.0 },
  { time: "6 AM", val: 6.1 },
  { time: "9 AM", val: 4.8 },
  { time: "12 PM", val: 3.6 },
  { time: "3 PM", val: 4.9 },
  { time: "6 PM", val: 5.5 },
];

export default function ResponseTimeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="time" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip />
        <Line type="monotone" dataKey="val" stroke="#6366F1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
