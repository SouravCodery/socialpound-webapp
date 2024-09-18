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
    authorized({ auth, request }) {
      const { nextUrl } = request;

      const serverToken = request.cookies.get("server-token")?.value;

      const isLoggedIn = !!auth?.user && serverToken;
      const isAuthRoute = nextUrl.pathname.startsWith("/account");

      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
    async signIn({ user, account, profile }) {
      return await signInServerSide({ user, account, profile });
    },
  },
  pages: {
    signIn: "/account/sign-in",
  },
});
