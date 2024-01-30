import { log } from "console";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account === null || profile == null) {
                return "FAIL";
            }
            if (account.provider === "google") {
                log("account", account)
                log("profile", profile)
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
})

export { handler as GET, handler as POST }

