import { NextResponse } from "next/server";
import { redis, connectRedis } from "@/lib/redis";

export async function GET() {
  try {
    await connectRedis();

    //store all the home page text in redis under the key "home"
    await redis.hSet("home", {
      eyebrow: "Product Management System",
      title: "Laptop Store",
      description: "A simple app to manage laptops from Dell, Lenovo and Acer.",
      cardTitle: "Welcome!",
      cardText: "Use the Products page to view, edit and delete laptops, or the Add page to create a new one.",
    });

    return NextResponse.json({ message: "Home text saved in Redis" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save home text" }, { status: 500 });
  }
}