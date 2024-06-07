import React from "react";
import { Usuario } from "../libs/models/usuarios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDb } from "../libs/mongoDb";
import { useSession } from "next-auth/react";

export const useSessionUser = async () => {
  try {
    connectDb();
    const { data: session } = useSession();

    console.log("session", session);

    return session.restaurante_id;
  } catch (error) {
    throw new Error(error);
  }
};
