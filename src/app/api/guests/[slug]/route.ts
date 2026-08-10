import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/guests/[slug] — look up a guest (and their family members) by their invite slug.
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const guest = await prisma.guest.findUnique({
    where: { slug: params.slug },
    include: { members: true },
  });

  if (!guest) {
    return NextResponse.json({ error: "Guest not found" }, { status: 404 });
  }

  return NextResponse.json(guest);
}
