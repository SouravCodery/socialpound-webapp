import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isPublicRoute = [
    "/about-us",
    "/privacy-policy",
    "/terms-of-service",
  ].includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const serverToken = request.cookies.get("server-token")?.value;

  const isLoggedIn = !!serverToken;
  const isAuthRoute = nextUrl.pathname.startsWith("/account");

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL("/account/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
