import { Usuario } from "@/app/libs/models/usuarios";

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectDb } from "@/app/libs/mongoDb";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    await connectDb();
    const user = await Usuario.findOne({ email: credentials.email });
    if (!user) throw new Error("Usuario no encontrado");

    const passwordcorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!passwordcorrect) throw new Error("Credenciales invalidas");

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await login(credentials);
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.username = token.username;
        session.email = token.email;
        session.id = token.id;
        session.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
};

export const authOptions = NextAuth(config);

export { authOptions as GET, authOptions as POST };
