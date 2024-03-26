import React from "react";
import { Usuario } from "../libs/models/usuarios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDb } from "../libs/mongoDb";

export const useSessionUser = async () => {
  try {
    connectDb();
    const session = await getServerSession(authOptions);
    const usuario = await Usuario.findOne({ email: session.user.email });

    return usuario.restaurante;
  } catch (error) {
    throw new Error(error);
  }
};
