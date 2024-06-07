import { NextResponse } from "next/server";
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

import { calcularImpuesto } from "@/app/libs/calcularImpuesto";
import { getServerSession } from "next-auth";
import { getSessionReal } from "../auth/[...nextauth]/route";
import { Restaurante } from "@/app/libs/models/restaurante";
import { Categoria } from "@/app/libs/models/categorias";
import { Proveedor } from "@/app/libs/models/proveedores";
import { IdRestauranteAlAlma } from "@/app/libs/id_restaurante";
import { Usuario } from "@/app/libs/models/usuarios";
import { getSession } from "next-auth/react";
import handler from "@/app/libs/getSessionUser";

export async function GET() {
  const session = await handler();

  console.log("usuario", session);
  try {
    connectDb();

    const allproducts = await Producto.find({
      restaurante_id: IdRestauranteAlAlma,
    }).populate("category_id");

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
    restaurante_id,
    proveedor_id,
    category_id,
    stock,
    stock_min,
    unidad,
    mas_vendido,
    itbms,
    presentacion_por_unidad,
    precio_por_unidad,
  } = await req.json();

  const { impuestoDelProducto, costoTotal } = calcularImpuesto({
    precio_por_unidad,
    presentacion_por_unidad,
    itbms,
  });

  try {
    connectDb();

    //Buscamos el restaurante al que pertenece
    const restaurantefound = await Restaurante.findById(restaurante_id);
    //Buscamos la category_id
    const categoriafound = await Categoria.findById(category_id);
    //Buscamos el proveedor_id
    const proveedorfound = await Proveedor.findById(proveedor_id);

    //Creamos el producto insertandole el category_id, restaurante_id y proveedor_id

    const newproducto = await Producto.create({
      nombre,
      restaurante_id: restaurantefound._id,
      proveedor_id: proveedorfound._id,
      category_id: categoriafound._id,
      stock,
      area,
      stock_min,
      unidad,
      mas_vendido,
      itbms: impuestoDelProducto,
      costo: costoTotal,
      presentacion_por_unidad,
      precio_por_unidad,
    });
    //Insertamos en el restaurante encontrado el new_product_id
    restaurantefound.productos.push(newproducto._id);

    //Insertamos en la categoria encontrada  el new_product_id
    categoriafound.productos.push(newproducto._id);

    //Insertamos en el proveedor encontrado  el new_product_id
    proveedorfound.productos.push(newproducto._id);

    // Guardamos el newproduct
    await newproducto.save();
    // Guardamos el restaurante
    await restaurantefound.save();
    // Guardamos el categoria
    await categoriafound.save();
    // Guardamos el proveedor
    await proveedorfound.save();

    if (!newproducto) {
      return NextResponse.json("Error al crear el producto");
    }

    const productonew = await newproducto.save();
    return NextResponse.json(productonew);
  } catch (error) {
    return NextResponse.json(error);
  }
}
