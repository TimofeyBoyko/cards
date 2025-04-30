import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check if the request is for the root path
  if (url.pathname === "/") {
    // Redirect to the /cards path
    return NextResponse.redirect(new URL("/cards", request.url));
  }

  // For all other requests, continue normally
  return NextResponse.next();
}

// Define on which paths the middleware will run
export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
