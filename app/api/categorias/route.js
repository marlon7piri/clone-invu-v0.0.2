import { Categoria } from "@/app/libs/models/categorias";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectDb();

    const categorias = await Categoria.find({});

    console.log(categorias);

    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const { nombre } = await req.json();

  console.log(nombre);
  try {
    connectDb();

    const exist = await Categoria.findOne({ nombre: nombre });
    if (exist)
      return NextResponse.json(
        "No se pudo crear la categoria porque ya existe"
      );

    await Categoria.create({
      nombre,
    });

    return NextResponse.json("Categoria creada");
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
