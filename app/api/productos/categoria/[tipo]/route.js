import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { IdRestauranteAlAlma } from "@/app/libs/id_restaurante";
import { getSession } from "next-auth/react";

export async function POST(req, { params }) {
  const categoria = params.tipo;
  const body = await req.json();

  try {
    connectDb();
    const allproductsByCategory = await Producto.find({
      area: categoria,
      restaurante_id: body,
    });

    if (!allproductsByCategory)
      return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(allproductsByCategory);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
