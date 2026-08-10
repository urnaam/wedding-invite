import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// GET /api/admin/export — CSV of every guest + their family members' answers.
export async function GET() {
  if (cookies().get("admin_auth")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guests = await prisma.guest.findMany({
    include: { members: true },
    orderBy: { displayName: "asc" },
  });

  const rows = [["Family", "Status", "Member", "Member attending", "Message", "Responded at"]];
  for (const g of guests) {
    if (g.members.length === 0) {
      rows.push([g.displayName, g.status, "", "", g.message ?? "", g.respondedAt?.toISOString() ?? ""]);
    }
    for (const m of g.members) {
      rows.push([
        g.displayName,
        g.status,
        m.name,
        m.attending ? "yes" : "no",
        g.message ?? "",
        g.respondedAt?.toISOString() ?? "",
      ]);
    }
  }

  const csv = rows
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rsvp-export.csv",
    },
  });
}
