import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials) {
          return null;
        }

        const email = credentials["email"];
        const password = credentials["password"];

        const prisma = new PrismaClient();
        const user = await prisma.users.findUnique({
          where: { email: email },
        });

        if (user === null) {
          return null;
        }

        const credential = await prisma.credentials.findFirst({
          where: {
            user_id: user.id,
          },
        });

        if (credential === null || credential.passwordhash === null) {
          return null;
        }

        if (bcrypt.compareSync(password, credential.passwordhash)) {
          console.log("password match");
          return { id: user.id.toString(), email: email, name: user.name };
        } else {
          console.log("no password match");
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account == null) {
        return false;
      }

      if (account.provider !== "google") {
        console.log("returning true because credentials");
        return true;
      }

      if (profile == null) {
        return false;
      }

      const OAuthEmail = profile["email"];
      const OAuthName = profile["name"];

      if (!OAuthName || !OAuthEmail) {
        return false;
      }

      const prisma = new PrismaClient();

      // aka if there are none, create a record
      if ((await prisma.users.count({ where: { email: OAuthEmail } })) === 0) {
        console.log("creating account");
        const new_user = await prisma.users.create({
          data: {
            email: OAuthEmail,
            name: OAuthName,
          },
        });

        await prisma.credentials.create({
          data: {
            user_id: new_user.id,
            authtype: "google",
          },
        });
      } else {
        console.log("signing in with current user");
        const user = await prisma.users.findFirst({
          where: { email: OAuthEmail },
        });
        if (user === null) {
          console.log("could not find user");
          return false;
        }
        const credential = await prisma.credentials.findFirst({
          where: { user_id: user.id },
        });
        if (credential === null || credential.authtype !== "google") {
          console.log("wrong credential");
          return false;
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/home";
    },
  },
});

export { handler as GET, handler as POST };
