import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // TODO
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials) {
          return null;
        }

        const email = credentials['email'];
        const password = credentials['password']

        const data = await sql`SELECT * FROM users WHERE email = ${email}`;
        const rows = data["rows"];


        if (rows.length === 0 || rows[0]["authtype"] !== "Credential") {
          return null;
        }


        const id = rows[0].userid;
        const credentialsData = await sql`select * from credentials where userid = ${id}`

        const rowData = credentialsData.rows;
        const hash = rowData[0].passwordhash

        if (bcrypt.compareSync(password, hash)) {
          console.log("password match");
          return { id: id, email: email }
        } else {
          console.log("no password match");
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async signIn({ account, profile }) {
      // account is from next, profile is from google
      console.log(account, profile);
      
      if(account == null) {
        return false;
      }
      
      if (account.provider !== "google") {
        console.log("returning true cause credentials");
        return true
      }

      if(profile == null) {
        return false;
      }

      const OAuthEmail = profile["email"];
      const OAuthName = profile["name"];
      const currentTimestamp = new Date().toISOString();

      const data = await sql`SELECT * FROM users WHERE email = ${OAuthEmail}`;
      const rows = data["rows"];
      // if there's no rows, then create an OAuth account
      if (rows.length == 0) {
        // TODO change this to prisma
        const newUser =
          await sql`INSERT INTO users (email, name, AuthType, CreatedAt, UpdatedAt)
VALUES (${OAuthEmail}, ${OAuthName}, ${"Google"}, ${currentTimestamp}, ${currentTimestamp})
RETURNING UserId`;

        const newUserId = newUser.rows[0]["userid"]; // Assuming 'id' is the name of the identity column in 'users' table

        await sql`INSERT INTO googleaccounts (UserId, Email, CreatedAt, UpdatedAt)
VALUES (${newUserId}, ${OAuthEmail}, ${currentTimestamp}, ${currentTimestamp})`;
      } else if (rows[0]["authtype"] !== "Google") {
        return false;
      }
      // if there's a row, make sure it matches the OAuth type, otherwise return False
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home";
    },
  },
});

export { handler as GET, handler as POST };
