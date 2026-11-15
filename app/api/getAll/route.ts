import { NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

export async function GET() {
  try {
    await authenticate();

    // get every record from the products table
    const products = await db.collection("products").getFullList({
      sort: "-created",
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}