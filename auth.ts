import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { signInServerSide } from "@/actions/user.action";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = nextUrl.pathname.startsWith("/account");

      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    async signIn({ user }) {
      await signInServerSide({ user });

      return true;
    },
  },
  pages: {
    signIn: "/account/sign-in",
  },
});
