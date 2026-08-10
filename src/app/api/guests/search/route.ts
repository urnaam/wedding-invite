import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/guests/search?q=namefragment — used by the homepage "find your invite" box.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) return NextResponse.json([]);

  const guests = await prisma.guest.findMany({
    where: { displayName: { contains: q, mode: "insensitive" } },
    select: { slug: true, displayName: true },
    take: 6,
  });

  return NextResponse.json(guests);
}
