import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add every idea slug here as you launch new ones
const IDEAS = ["saasswap", "launchready"];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Route *.tinylabs.tech subdomains to /[idea] path
  const match = hostname.match(/^([^.]+)\.tinylabs\.tech$/);
  if (match) {
    const subdomain = match[1];
    if (IDEAS.includes(subdomain)) {
      return NextResponse.rewrite(
        new URL(`/${subdomain}${pathname === "/" ? "" : pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
