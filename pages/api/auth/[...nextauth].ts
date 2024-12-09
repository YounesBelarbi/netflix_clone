import { env } from "@/lib/env";
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID || "",
      clientSecret: env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: env.GOOGLE_ID || "",
      clientSecret: env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: env.NEXTAUTH_JWT_SECRET,
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
