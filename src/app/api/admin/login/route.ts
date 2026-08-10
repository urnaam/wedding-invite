import { NextResponse } from "next/server";

// POST /api/admin/login — checks the password against ADMIN_PASSWORD env var
// and sets a short-lived httpOnly cookie if it matches.
export async function POST(req: Request) {
  const form = await req.formData();
  const password = form.get("password");

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD тохируулаагүй байна (.env)" },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    const url = new URL("/admin/login?error=1", req.url);
    return NextResponse.redirect(url, { status: 303 });
  }

  const res = NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
