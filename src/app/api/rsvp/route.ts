import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TransportType } from '@prisma/client';

// POST /api/rsvp
// body: { slug, attending, members: {id, attending}[], message?, dietaryNotes?, whichTransport? }
export async function POST(req: Request) {
  const body = await req.json();
  const {
    slug,
    attending,
    members,
    message,
    dietaryNotes,
    whichTransport,
    wantsAccommodation,
  } = body ?? {};

  if (!slug || typeof attending !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) {
    return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
  }

  const validTransport =
    attending && (whichTransport === 'car' || whichTransport === 'train')
      ? (whichTransport as TransportType)
      : null;

  await prisma.$transaction(async (tx) => {
    await tx.guest.update({
      where: { slug },
      data: {
        status: attending ? 'attending' : 'not_attending',
        message: message ?? null,
        dietaryNotes: attending ? (dietaryNotes ?? null) : null,
        whichTransport: validTransport,
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
