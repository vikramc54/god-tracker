import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error("Missing Google ID or Secret");
}
if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Missing NEXTAUTH_SECRET");
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") ?? [];
            return allowedEmails.includes(user.email ?? "");
        },
    },
    
};

export default authOptions;
