import { NextResponse } from "next/server";
import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";
import { Restaurante } from "@/app/libs/models/restaurante";

export async function GET() {
  try {
    connectDb();
    const usuarios = await Usuario.find({});

    if (!usuarios) return NextResponse.json({ message: "No hay usuarios" });

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const {
    username,
    password,
    email,
    isAdmin,
    restaurante_id,
    isActive,
    phone,
    address,
  } = await req.json();

  try {
    connectDb();

    const exist = await Usuario.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "El usuario  o el email existe" },
        { status: 500 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordhas = await bcrypt.hash(password, salt);
    const newuser = await Usuario.create({
      username,
      password: passwordhas,
      email,
      isAdmin,
      restaurante_id,
      isActive,
      phone,
      address,
    });

    console.log("restaurante_id", newuser.restaurante_id);

    const restaurante = await Restaurante.findById(newuser.restaurante_id);

    console.log({ restauranteencontrado: restaurante });
    const usercreated = await newuser.save();

    console.log({ ususariocreado: usercreated });

    restaurante.usuarios.push(usercreated._id);
    await restaurante.save();

    return NextResponse.json(
      { message: "Usuario Registrado en el restaurante " + restaurante.nombre },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
