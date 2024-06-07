import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession(req);

  // Procesa la sesión y responde a la solicitud

  console.log(session);
  if (session) {
    return { usuario: session.user.name };
  } else {
    throw new Error("Session no existe");
  }
}
