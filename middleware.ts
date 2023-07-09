import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // If user trying to
  if (
    request?.nextUrl?.pathname === "/edit-quizz" ||
    request?.nextUrl?.pathname === "/play-quizz"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
