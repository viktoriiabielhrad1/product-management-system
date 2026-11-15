"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// OPTIMISATION: only download each graph library when this page needs it
const BrandBarChart = dynamic(() => import("@/components/BrandBarChart"), {
  ssr: false,
  loading: () => <p>Loading graph...</p>,
});

const BrandLineChart = dynamic(() => import("@/components/BrandLineChart"), {
  ssr: false,
  loading: () => <p>Loading graph...</p>,
});

export default function Admin() {
  const [data, setData] = useState<{ brand: string; quantity: number }[]>([]);

  useEffect(() => {
    const getStats = async () => {
      //get all products from the database through the api
      const res = await fetch("/api/getAll");
      const products = await res.json();

      //count how many products each brand has
      const counts: Record<string, number> = {};
      for (const product of products) {
        counts[product.brand] = (counts[product.brand] ?? 0) + 1;
      }

      //turn the counts into a list the graphs can use
      setData(
        Object.entries(counts).map(([brand, quantity]) => ({ brand, quantity }))
      );
    };
    getStats();
  }, []);

  return (
    <section className="page">
      <h1>Admin</h1>

      <div className="card">
        <h2>Laptops in stock by brand (bar graph, Recharts)</h2>
        <BrandBarChart data={data} />
      </div>

      <div className="card">
        <h2>Laptops in stock by brand (line graph, Chart.js)</h2>
        <BrandLineChart data={data} />
      </div>
    </section>
  );
}