import ConnectDB from "@/app/db/Connect";
import User from "@/app/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password");
          }
          await ConnectDB();

          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("Email is not exist! ");
          }

          const isValid = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Password does not match!");
          }
          return user;
        } catch (err) {
          throw new Error(err.message || "Internal server error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const mongoUser = await User.findOne({ email: session?.user.email });
      session.user = {
        email: mongoUser?.email,
        profileImage: mongoUser?.Image,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
