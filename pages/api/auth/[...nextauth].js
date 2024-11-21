import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple in-memory "database" for testing purposes
const users = [
  {
    username: "testuser",
    password: "password123",
    name: "Test User",
  },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );
        if (user) {
          return { name: user.name, username: user.username };
        }
        return null; // Return null if credentials are invalid
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Customize the sign-in page path if you want
  },
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.name = token.name;
      return session;
    },
  },
});
