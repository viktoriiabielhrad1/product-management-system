"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//tell chart.js which parts i'm using
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function BrandLineChart({
  data,
}: {
  data: { brand: string; quantity: number }[];
}) {
  //chart.js wants the labels and the numbers as two separate lists
  const chartData = {
    labels: data.map((item) => item.brand),
    datasets: [
      {
        label: "Laptops in stock",
        data: data.map((item) => item.quantity),
        borderColor: "#16a34a",
      },
    ],
  };

  //start the y axis at 0 and count in whole numbers
  const options = {
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  return <Line data={chartData} options={options} />;
}