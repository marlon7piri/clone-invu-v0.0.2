import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";
import { Producto } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";
import { useSessionUser } from "@/app/hooks/useSessionUser";

export async function GET() {
  try {
    connectDb();

    const idRestaurante = await useSessionUser()

    const allproducts = await Merma.find({restaurante:idRestaurante}).populate("producto");

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(allproducts);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    connectDb();

    const productfound = await Producto.findById({ _id: body.idproduct });
    const merma = await Merma.create({
      producto: productfound._id,
      fecha: body.fecha,
      servicio: body.servicio,
      cantidad: body.cantidad,
      causa: body.causa,
      observaciones: body.observaciones,
      restaurante: productfound.restaurante,
    });
    
    await merma.save();
    const productoUpdated = await Producto.findOneAndUpdate(
      { _id: body.idproduct },
      { $inc: { stock: -body.cantidad } },
      { new: true }
    );

    const newproducto = await productoUpdated.save();

    return NextResponse.json(newproducto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
