import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { Restaurante } from "@/app/libs/models/restaurante";
import { Producto } from "@/app/libs/models/productos";
import bcrypt from "bcrypt";
import {
  IdRestauranteAlAlma,
  IdRestauranteDominos,
} from "@/app/libs/id_restaurante";

export async function GET() {
  try {
    connectDb();

    const restaurantes = await Restaurante.find({
      _id: IdRestauranteDominos,
    }).populate("usuarios");

    return NextResponse.json({ restaurantes: restaurantes });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export const POST = async (req, res) => {
  const body = await req.json();
  try {
    connectDb();

    const restaurante = await Restaurante.create({
      nombre: body.nombre,
    });

    const newresta = await restaurante.save();

    return NextResponse.json({ message: "All done", newresta });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
