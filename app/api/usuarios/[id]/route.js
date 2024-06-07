import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function DELETE(req, { params }) {
  const id = await params.id;

  await connectDb();
  try {
    const productdeleted = await Usuario.findByIdAndDelete(id);

    if (!productdeleted) return NextResponse.json(404);

    return NextResponse.json(productdeleted);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export async function GET(req, { params }) {
  const id = await params.id;

  try {
    await connectDb();
    const usuario = await Usuario.findById(id);

    if (!usuario) return NextResponse.json(404);

    const {
      username,
      password,
      email,
      isAdmin,
      isActive,
      phone,
      address,
      restaurante_id,
    } = usuario;

    return NextResponse.json({
      username,
      email,
      isAdmin,
      isActive,
      phone,
      address,
      restaurante_id,
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(req, { params }) {
  const id = params.id;
  const data = await req.json();

  const passwordhased = await bcrypt.hash(data.password, 10);

  try {
    connectDb();
    const usuario = await User.findByIdAndUpdate(id, {
      ...data,
      password: passwordhased,
    });

    if (!usuario)
      return NextResponse.json({ message: "No se encontro ningun usuario" });
    return NextResponse.json(usuario);
  } catch (error) {
    return Response.json({ message: error });
  }
}
