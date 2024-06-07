import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

import { IdRestauranteAlAlma } from "@/app/libs/id_restaurante";

export async function GET(req, { params }) {
  const id_restaurante_del_usuario = params.restaurante_id;

  console.log("parametro", id_restaurante_del_usuario);
  try {
    connectDb();

    const allproducts = await Producto.find({
      restaurante_id: id_restaurante_del_usuario,
    }).populate("category_id");

    if (!allproducts)
      return NextResponse.json({
        message: "No hay productos que pertenezcan a este restaurante",
      });

    return NextResponse.json(allproducts);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
