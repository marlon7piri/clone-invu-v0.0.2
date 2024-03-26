import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

import { useSessionUser } from "@/app/hooks/useSessionUser";

export async function GET(req, { params }) {
  const categoria = params.tipo;
  
  try {
    connectDb();
    const idRestaurante = await useSessionUser();
    const allproductsByCategory = await Producto.find({
      area: categoria,
      restaurante: idRestaurante,
    }).populate('categoria');

    if (categoria === undefined) {
      const allproducts = await Producto.find({
        restaurante: idRestaurante,
      }).populate('categoria');
      console.log(allproducts);
      return NextResponse.json(allproducts);
    }

    if (!allproductsByCategory)
      return NextResponse.json({ message: "No hay productos" });

    
    return NextResponse.json(allproductsByCategory);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
