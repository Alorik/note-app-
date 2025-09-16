// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"; // ✅ use bcryptjs (not bcrypt) for compatibility
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    // ✅ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // 👈 forces Google to ask every time
        },
      },
    }),

    // ✅ Email + Password (Credentials)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // 1. Connect DB
        await connectDB();

        // 2. Find user
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        // 3. Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // 4. Return minimal user object for session
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Attach user ID to session
      if (token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },

    async signIn({ user, account }: { user: any; account: any }) {
      // Google login → ensure user exists in DB
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            password: undefined, // no password for OAuth users
          });
        }
      }
      return true;
    },
  },

  session: {
    strategy: "jwt" as const, // ✅ keep JWT sessions for stateless auth
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
