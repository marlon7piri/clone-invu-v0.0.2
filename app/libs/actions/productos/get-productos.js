import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";
import { getServerSession } from "next-auth";
import { Usuario } from "../../models/usuarios";

export const getProductos = async () => {
 
  try {
     connectDb();
     const session = await getServerSession(authOptions);
  
    const user = await Usuario.findOne({ email: session.user.email });
    const allproducts = await Producto.find({
      restaurante: user.restaurante,
    });

    return Response.json( allproducts)
  } catch (error) {
    throw new Error(error);
  }
};
