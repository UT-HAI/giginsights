import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@vercel/postgres"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account == null || profile == null) {
        return false
      }
      const OAuthEmail = profile['email']
      const OAuthName = profile['name']
      const currentTimestamp = new Date().toISOString();

      const data = await sql`SELECT * FROM users WHERE email = ${OAuthEmail}`;
      const rows = data['rows']
      // if there's no rows, then create an OAuth account
      if (rows.length == 0) {
        const newUser = await sql`INSERT INTO users (email, name, AuthType, CreatedAt, UpdatedAt)
VALUES (${OAuthEmail}, ${OAuthName}, ${'Google'}, ${currentTimestamp}, ${currentTimestamp})
RETURNING UserId`;

        const newUserId = newUser.rows[0]["UserId"]; // Assuming 'id' is the name of the identity column in 'users' table

        await sql`INSERT INTO googleaccounts (UserId, Email, CreatedAt, UpdatedAt)
VALUES (${newUserId}, ${OAuthEmail}, ${currentTimestamp}, ${currentTimestamp})`;

      } else if (rows[0]["authtype"] !== "Google") {
        return false;
      }
      // if there's a row, make sure it matches the OAuth type, otherwise return False
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/home"
    },
  },
});

export { handler as GET, handler as POST };
