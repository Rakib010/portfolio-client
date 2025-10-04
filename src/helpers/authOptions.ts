import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            role?: string | null;
        };
    }
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        role?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!res.ok) return null;

                    const responseData = await res.json();
                    const user = responseData?.data?.user;
                    console.log("response", responseData)
                    console.log("data", user)

                    if (user && user._id) {
                        return {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }

                    return null;
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                    email: token.email as string,
                    role: token.role as string,
                };
            }
            return session;
        },
    },

    pages: {
        signIn: "/login", // custom login page
    },
};
