import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    /* ================= SIGN IN ================= */
    async signIn({ user }) {
      if (!user.email) return false;

      await connectDB();

      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name,
          nationality: 'India',
          image: user.image,
        });
      }

      return true;
    },

    /* ================= JWT ================= */
    async jwt({ token }) {
      if (!token.email) return token;

      token.isAdmin = adminEmails.includes(token.email);

      return token;
    },

    /* ================= SESSION ================= */
    async session({ session, token }) {
      if (!session.user?.email) return session;

      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser && session.user) {
        session.user.id = dbUser._id.toString();
        session.user.phone = dbUser.phone || "";
        session.user.nationality = dbUser.nationality || "India";
        session.user.address = dbUser.address || "";
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
