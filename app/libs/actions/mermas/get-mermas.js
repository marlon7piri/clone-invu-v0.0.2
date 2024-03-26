

import { getServerSession } from "next-auth";
import { Merma } from "../../models/mermas";
import { connectDb } from "../../mongoDb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Usuario } from "../../models/usuarios";


export const getMermas = async () => {
  try {
    connectDb();
  
    const session = await getServerSession(authOptions);


    const usuario = await Usuario.findOne({email:session.user.email})

    const mermas = await Merma.find({
      restaurante: usuario.restaurante,
    }).populate("producto");
   

    return Response.json(mermas);
  } catch (error) {
    throw new Error(error);
  }
};
