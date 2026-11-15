import { NextRequest, NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    await authenticate();

    //read the values from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const brand = searchParams.get("brand");
    const model = searchParams.get("model");
    const price = searchParams.get("price");
    const description = searchParams.get("description");
    const image = searchParams.get("image") ?? "";

    //check they exist
    if (!id || !brand || !model || !price || !description) {
      return NextResponse.json({error: "All fields are required"}, {status: 400});
    }

    //change the product that has this id
    const product = await db.collection("products").update(id, {
      brand,
      model,
      price,
      description,
      image,
    });

    return NextResponse.json(product, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to update product"}, {status: 500});
  }
}