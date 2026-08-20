import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/rsvp
// body: { slug, attending, members: {id, attending}[], message?, dietaryNotes?, needsTransport? }
export async function POST(req: Request) {
  const body = await req.json();
  const {
    slug,
    attending,
    members,
    message,
    dietaryNotes,
    needsTransport,
    wantsAccommodation,
  } = body ?? {};

  if (!slug || typeof attending !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.guest.update({
      where: { slug },
      data: {
        status: attending ? 'attending' : 'not_attending',
        message: message ?? null,
        dietaryNotes: attending ? (dietaryNotes ?? null) : null,
        needsTransport: attending ? !!needsTransport : null,
        needsAccommodation: attending ? !!wantsAccommodation : null,
        respondedAt: new Date(),
      },
    });

    if (Array.isArray(members)) {
      for (const m of members) {
        await tx.familyMember.update({
          where: { id: m.id },
          data: { attending: attending ? !!m.attending : false },
        });
      }
    }
  });

  return NextResponse.json({ ok: true });
}
