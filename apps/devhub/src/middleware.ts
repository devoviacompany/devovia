import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const isLocalhost = hostname.includes("localhost");

  // Skip Next.js internals and static files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/robots.txt") ||
    url.pathname.startsWith("/sitemap.xml") ||
    url.pathname.startsWith("/fonts") ||
    url.pathname.startsWith("/icons") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 🚫 Block access to certain routes until logic is ready
  // Block in production only
  if (!isLocalhost) {
    // 🚫 Block some things in production
    // if (hostname.startsWith("devhub.")) {
    //   url.pathname = "/site/forbidden";
    //   return NextResponse.rewrite(url);
    // }
  }

  // ✅ Docs subdomain
  const isDevhubSubdomain =
    hostname.startsWith("devhub.") ||
    (hostname === "localhost:3000" && url.pathname.startsWith("/devhub"));

  if (isDevhubSubdomain) {
    if (!url.pathname.startsWith("/devhub")) {
      url.pathname = `/devhub${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
