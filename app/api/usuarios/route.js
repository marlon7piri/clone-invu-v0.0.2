import { NextResponse } from "next/server";
import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";

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
    restaurante,
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
    await Usuario.create({
      username,
      password: passwordhas,
      email,
      isAdmin,
      restaurante,
      isActive,
      phone,
      address,
    });

    return NextResponse.json(
      { message: "Usuario Registrado " },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
