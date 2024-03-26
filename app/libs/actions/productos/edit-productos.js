
import { Producto } from "@/app/libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";


export const getOnlyAProducto = async (id) => {
  try {
     connectDb();
    

    const allproducts = await Producto.find({});
    return allproducts;
  } catch (error) {
    throw new Error("Failed to fetch producto desde el backend");
  }
};
