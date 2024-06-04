import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { Restaurante } from "@/app/libs/models/restaurante";
import { Producto } from "@/app/libs/models/productos";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    connectDb();

    const restaurantes = await Restaurante.find({});

    return NextResponse.json({ restaurantes: restaurantes });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export const POST = async () => {
  try {
    connectDb();

    const restaurante = await Restaurante.create({
      nombre: "Dominos Pizza",
    });
    const passwordhash = await bcrypt.hash("marlon7piri", 10);

    const user = await Usuario.create({
      username: "Marlon Rodriguez",
      password: passwordhash,
      email: "marlon7piri@gmail.com",
      restaurante: restaurante._id,
      isAdmin: true,
    });

    if (!user) {
      return NextResponse.json({ message: "No se puedo crear el usuario" });
    }

    const producto = await Producto.create({
      nombre: "Pizza Pepperoni",
      cantidad: 100,
      categoria: "cocina",
      restaurante: restaurante._id,
    });

    if (!producto) {
      return NextResponse.json({ message: "No se puedo crear el usuario" });
    }
    restaurante.usuarios.push(user._id);
    restaurante.productos.push(producto._id);

    await producto.save();
    await user.save();
    const newresta = await restaurante.save();

    return NextResponse.json({ message: "All done", newresta });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
