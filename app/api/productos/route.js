import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

import { useSessionUser } from "@/app/hooks/useSessionUser";
import { Categoria } from "@/app/libs/models/categorias";
import { calcularImpuesto } from "@/app/libs/calcularImpuesto";

export async function GET() {
  try {
    connectDb();
    const idRestaurante = await useSessionUser();

    const allproducts = await Producto.find({
      restaurante: idRestaurante,
    }).populate("categoria");

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });

    return NextResponse.json(allproducts);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const {
    nombre,
    area,
    categoria,
    stock,
    stock_min,
    unidad,
    mas_vendido,
    proveedor,
    itbms,
    presentacion_por_unidad,
    precio_por_unidad,
  } = await req.json();

  const {impuestoDelProducto,costoTotal} = calcularImpuesto({precio_por_unidad,presentacion_por_unidad, itbms});
  console.log(impuestoDelProducto,costoTotal)
  try {
    connectDb();
    const idRestaurante = await useSessionUser();
    const categoriaName = await Categoria.findOne({ nombre: categoria });
    

    const producto = await Producto.create({
      nombre,

      stock,
      area,
      categoria: categoriaName._id,
      stock_min,
      unidad,
      mas_vendido,
      proveedor,
      itbms:impuestoDelProducto,
      costo: costoTotal,
      presentacion_por_unidad,
      precio_por_unidad,
      restaurante: idRestaurante,
    });
    if (!producto) {
      return NextResponse.json("Error al crear el producto");
    }
    console.log(producto);

    const productonew = await producto.save();
    /* console.log(productonew); */
    return NextResponse.json(productonew);
  } catch (error) {
    return NextResponse.json(error);
  }
}
