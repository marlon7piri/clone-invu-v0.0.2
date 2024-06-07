import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { Restaurante } from "@/app/libs/models/restaurante";
import { Proveedor } from "@/app/libs/models/proveedores";

export async function GET() {
  try {
    connectDb();

    const proveedor = await Proveedor.find({});

    return NextResponse.json({ proveedor: proveedor });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export const POST = async (req, res) => {
  const body = await req.json();
  try {
    connectDb();

    const proveedor = await Proveedor.create({
      nombre: body.nombre,
      restaurante_id: body.restaurante_id,
    });

    const proveedornew = await proveedor.save();

    return NextResponse.json({ message: "All done", proveedornew });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
