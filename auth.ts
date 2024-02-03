import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { signInServerSide } from "@/actions/user.actions";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub, Google],
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
    async signIn({ user, ...other }) {
      await signInServerSide({ user, other });

      return true;
    },
  },
  pages: {
    signIn: "/account/sign-in",
  },
});
