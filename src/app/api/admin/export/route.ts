import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
// GET /api/admin/export — CSV of every guest + their family members' answers.
export async function GET() {
  if (cookies().get('admin_auth')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const guests = await prisma.guest.findMany({
    include: { members: true },
    orderBy: { displayName: 'asc' },
  });

  const sideLabels: Record<string, string> = {
    bride: 'Bride side',
    groom: 'Groom side',
  };

  const rows = [
    [
      'Family',
      'Side',
      'Status',
      'Member Name',
      'Is Child',
      'Member Attending',
      'Dietary Notes',
      'Needs Transport',
      'Needs Accommodation',
      'Message / Toast',
      'Responded At',
    ],
  ];
  for (const g of guests) {
    const formattedTransport =
      g.status === 'attending' ? (g.needsTransport ? 'yes' : 'no') : '—';
    const formattedAccommodation =
      g.status === 'attending' ? (g.needsAccommodation ? 'yes' : 'no') : '—';
    if (g.members.length === 0) {
      rows.push([
        g.displayName,
        sideLabels[g.side] ?? g.side,
        g.status,
        '',
        '',
        '',
        g.dietaryNotes ?? '',
        formattedTransport,
        formattedAccommodation,
        g.message ?? '',
        g.respondedAt?.toISOString() ?? '',
      ]);
    }
    for (const m of g.members) {
      rows.push([
        g.displayName,
        sideLabels[g.side] ?? g.side,
        g.status,
        m.name,
        m.isChild ? 'child' : 'adult',
        m.attending ? 'yes' : 'no',
        g.dietaryNotes ?? '',
        formattedTransport,
        formattedAccommodation,
        g.message ?? '',
        g.respondedAt?.toISOString() ?? '',
      ]);
    }
  }

  const csv = rows
    .map((r) =>
      r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
    )
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename=rsvp-export.csv',
    },
  });
}
