import { NextRequest, NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    await authenticate();

    //read the id from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const product = await db.collection("products").getOne(id);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}