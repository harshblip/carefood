import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/prisma";

export const authOptions = ({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text", placeholder: "John Doe" },
                city: { label: "City", type: "text", placeholder: "New York" },
                phoneNumber: { label: "Phone Number", type: "text", placeholder: "123-456-7890" },
                funFood: { label: "Favorite Food", type: "text", placeholder: "Pizza" },
            },
            async authorize(credentials) {
                // Assuming you have a custom signup API endpoint that handles these fields
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const user = await res.json();

                if (res.ok && user) {
                    // Return user object to be saved in the session
                    return user;
                } else {
                    // Return null if user not found or signup failed
                    return "lolz";
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            return session;
        },
    },
    auth: {
        useSecureCookies: false,
    }
});

export default NextAuth(authOptions);
