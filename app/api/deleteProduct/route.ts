import { NextRequest, NextResponse } from "next/server";
import { db, authenticate } from "@/lib/database";

export async function DELETE(request: NextRequest) {
  try {
    await authenticate();

    //read the id from the URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({error: "ID is required"}, {status: 400});
    }

    //remove the product that has this id
    await db.collection("products").delete(id);

    return NextResponse.json({message: "Product deleted"}, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to delete product"}, {status: 500});
  }
}