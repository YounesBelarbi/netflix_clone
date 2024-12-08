import { env } from "@/lib/env";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname === "/") {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    secret: env.NEXTAUTH_JWT_SECRET,
  }
);

export const config = { matcher: ["/"] };
