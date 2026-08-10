import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate every /admin page (except the login page itself) behind a cookie
// that's only set after a correct password is submitted.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const authed = req.cookies.get("admin_auth")?.value === "1";
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
