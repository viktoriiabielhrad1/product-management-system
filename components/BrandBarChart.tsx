"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function BrandBarChart({
  data,
}: {
  data: { brand: string; quantity: number }[];
}) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="brand" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="quantity" fill="#4f46e5" />
    </BarChart>
  );
}