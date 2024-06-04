import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";
import { Producto } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";
import { useSessionUser } from "@/app/hooks/useSessionUser";

export async function GET() {
  try {
    connectDb();

    const allproducts = await Merma.find({});

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(allproducts);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const body = await req.json();

  console.log(body);

  try {
    connectDb();

    const producto = await Producto.findById(body.idproduct);

    const merma = await Merma.create({
      producto: producto.nombre,
      fecha: body.fecha,
      servicio: body.servicio,
      cantidad: body.cantidad,
      causa: body.causa,
      observaciones: body.observaciones,
    });

    const mermasaved = await merma.save();

    return NextResponse.json(mermasaved);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
