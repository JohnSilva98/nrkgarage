import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // 🔥 Aqui você valida no banco
        if (
          credentials.email === "admin@email.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };