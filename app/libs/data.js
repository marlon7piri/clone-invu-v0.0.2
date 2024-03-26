import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Producto } from "@/app/libs/models/productos";
import { Usuario } from "@/app/libs/models/usuarios";
import { connectDb } from "@/app/libs/mongoDb";
import { useSessionUser } from "../hooks/useSessionUser";

export const getProductos = async () => {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    console.log(session);
    const usuario = await Usuario.findOne({ email: session?.user?.email });

    console.log(usuario.restaurante);
    const allproducts = await Producto.find({
      restaurante: usuario.restaurante,
    });
    console.log(allproducts);
    return allproducts;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async (query) => {
  const regex = new RegExp(query, "i");

  try {
    await connectDb();
    const idRestaurante = await useSessionUser();

    const allproducts = await Producto.find({
      nombre: { $regex: regex },
      restaurante: idRestaurante,
    });

    return allproducts;
  } catch (error) {
    throw new Error("Failed to fetch products desde el backend");
  }
};

export const getUsuarios = async (query) => {
  const regex = new RegExp(query, "i");

  try {
    connectDb();
    const allusers = await Usuario.find({ username: { $regex: regex } });

    return allusers;
  } catch (error) {
    throw new Error("Failed to fetch users desde el backend");
  }
};
