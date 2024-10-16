import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log(request.cookies.get('token')?.value)
  if (!request.cookies.get("token")?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/booking/:name*", "/booking-failed", "/booking-success"],
};
