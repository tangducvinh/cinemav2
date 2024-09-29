import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(!request.cookies.has("token"));

  //   if (!request.cookies.has("token")) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/booking/:name*",
};
