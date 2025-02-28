import prisma from "lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Type in your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type in your password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (dbUser && dbUser.password === credentials.password) {
          // const {password, create}
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};
