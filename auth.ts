import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isLoginPage = nextUrl.pathname === "/api/auth/signin";

      // if (isLoggedIn && isLoginPage) {
      //   return Response.redirect(new URL("/home"));
      // }

      if (isLoggedIn) return true;
      return false;
    },
  },
});
