import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/book-catalog"];
const onlyLoggedOutRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (
    session &&
    onlyLoggedOutRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    return Response.redirect(new URL("/book-catalog", request.url));
  }

  if (
    !session &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return Response.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "next-action" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
