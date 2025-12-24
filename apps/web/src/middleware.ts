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
    url.pathname.startsWith("/avatars") ||
    url.pathname.startsWith("/fonts") ||
    url.pathname.startsWith("/icons") ||
    url.pathname.startsWith("/illustrations") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/logos") ||
    url.pathname.startsWith("/team") ||
    url.pathname.startsWith("/avatar.webp") ||
    url.pathname.startsWith("/dashboard.png") ||
    url.pathname.startsWith("/placeholder.svg") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 🚫 Block access to certain routes until logic is ready
  // Block in production only
  if (!isLocalhost) {
    // 🚫 Block dev. and test. subdomains in production
    // if (hostname.startsWith("dev.") || hostname.startsWith("test.")) {
    //   url.pathname = "/site/forbidden";
    //   return NextResponse.rewrite(url);
    // }
  }

  // ✅ Dev (Workspace admin dashboard) subdomain
  const isDevSubdomain = url.pathname.startsWith("/workspace");

  if (isDevSubdomain) {
    if (!url.pathname.startsWith("/workspace")) {
      url.pathname = `/workspace${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // ✅ Default site (marketing, e-shop, auth, user dashboards)
    if (!url.pathname.startsWith("/site")) {
      url.pathname = `/site${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
