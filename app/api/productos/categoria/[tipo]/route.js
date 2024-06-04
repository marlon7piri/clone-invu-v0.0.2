import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

export async function GET(req, { params }) {
  const categoria = params.tipo;

  try {
    connectDb();
    const allproductsByCategory = await Producto.find({
      area: categoria,
    });


    if (!allproductsByCategory)
      return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(allproductsByCategory);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
