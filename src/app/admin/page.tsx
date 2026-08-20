import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // always show fresh RSVP data

const statusLabels: Record<string, string> = {
  attending: 'Coming',
  not_attending: 'Not coming',
  pending: 'Pending',
};

const sideLabels: Record<string, string> = {
  bride: 'Bride side',
  groom: 'Groom side',
};

// 📦 TypeScript параметрүүдийг өргөтгөв
type SearchParams = {
  status?: string;
  side?: string;
  transport?: string;
  accommodation?: string;
  speech?: string;
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const statusFilter = searchParams.status ?? 'all';
  const sideFilter = searchParams.side ?? 'all';
  const transportFilter = searchParams.transport ?? 'all';
  const accommodationFilter = searchParams.accommodation ?? 'all';
  const speechFilter = searchParams.speech ?? 'all';

  // 🎯 Динамик Prisma WHERE шүүлтүүр бэлдэх хэсэг
  const where: Record<string, any> = {};
  if (statusFilter !== 'all') where.status = statusFilter;
  if (sideFilter !== 'all') where.side = sideFilter;

  if (transportFilter !== 'all') {
    where.needsTransport = transportFilter === 'yes';
  }
  if (accommodationFilter !== 'all') {
    where.needsAccommodation = accommodationFilter === 'yes';
  }
  if (speechFilter !== 'all') {
    // Үг хэлэх хүсэлтэй хүмүүсийн мессеж талбарт тусгай текст хадгалагддаг туг
    if (speechFilter === 'yes') {
      where.message = { contains: 'үг хэлж, тост дэвшүүлэх хүсэлтэй' };
    } else {
      where.NOT = { message: { contains: 'үг хэлж, тост дэвшүүлэх хүсэлтэй' } };
    }
  }

  const [allGuests, filteredGuests] = await Promise.all([
    prisma.guest.findMany({ include: { members: true } }),
    prisma.guest.findMany({
      where,
      include: { members: true },
      orderBy: { displayName: 'asc' },
    }),
  ]);

  // 📊 ҮНДСЭН СТАТИСТИК ТООЛОЛТУУД
  const totalFamilies = allGuests.length;
  const attendingFamilies = allGuests.filter(
    (g) => g.status === 'attending',
  ).length;
  const notAttendingFamilies = allGuests.filter(
    (g) => g.status === 'not_attending',
  ).length;
  const pendingFamilies = allGuests.filter(
    (g) => g.status === 'pending',
  ).length;

  // 👨‍👩‍👧‍👦 Нийт ирэх Том хүн болон Хүүхдийн тоог салгаж тоолох
  const totalAdultsComing = allGuests
    .filter((g) => g.status === 'attending')
    .reduce(
      (sum, g) =>
        sum + g.members.filter((m) => m.attending && !m.isChild).length,
      0,
    );

  const totalChildrenComing = allGuests
    .filter((g) => g.status === 'attending')
    .reduce(
      (sum, g) =>
        sum + g.members.filter((m) => m.attending && m.isChild).length,
      0,
    );

  // 🚌 Шинэ асуулгуудын тоолуур
  const transportCount = allGuests.filter(
    (g) => g.status === 'attending' && g.needsTransport === true,
  ).length;
  const accommodationCount = allGuests.filter(
    (g) => g.status === 'attending' && g.needsAccommodation === true,
  ).length;
  const speechCount = allGuests.filter(
    (g) =>
      g.status === 'attending' &&
      g.message?.includes('үг хэлж, тост дэвшүүлэх хүсэлтэй'),
  ).length;

  const brideFamilies = allGuests.filter((g) => g.side === 'bride').length;
  const groomFamilies = allGuests.filter((g) => g.side === 'groom').length;

  // 🎨 СТАТИСТИК КАРТУУД (Дизайн болон Багтаамжид тааруулав)
  const statCards = [
    ['Total invitation', totalFamilies, 'border-gold/20'],
    ['Coming Family', attendingFamilies, 'border-gold/20'],
    ['Coming Adults', totalAdultsComing, 'border-gold/40 text-gold'],
    ['Coming Children', totalChildrenComing, 'border-gold/40 text-gold'], // 👈 Хүүхэд тоолуур
    ['Transport', transportCount, 'border-blue-400/20'],
    ['Accommodation', accommodationCount, 'border-purple-400/20'],
    ['Speech', speechCount, 'border-emerald-400/20'],
  ] as const;

  return (
    <main className="min-h-screen bg-navy px-4 sm:px-6 py-16 text-ivory">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-4xl italic">RSVP Admin Dashboard</h1>
          <div className="flex gap-3">
            <a
              href="/api/admin/export"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm uppercase tracking-[0.1em] hover:bg-gold hover:text-navy transition"
            >
              CSV download
            </a>
            <form action="/api/admin/logout" method="POST">
              <button className="rounded-full border border-ivory/20 px-5 py-2 text-sm uppercase tracking-[0.1em] text-ivory/70 hover:border-ivory/50 transition">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* 📊 ТОП СТАТИСТИК КАРТУУД */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {statCards.map(([label, value, borderClass]) => (
            <div
              key={label}
              className={`rounded-2xl border ${borderClass} bg-[#142038]/30 p-4 text-center shadow-md`}
            >
              <div className="font-display text-3xl text-gold font-semibold">
                {value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.05em] text-ivory/60 leading-tight">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* 🔍 ШИНЭЧЛЭГДСЭН ИЖ БҮРЭН ШҮҮЛТҮҮРИЙН ФОРМ */}
        <form
          method="GET"
          className="mt-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-end rounded-2xl border border-gold/20 bg-[#142038]/20 p-5 shadow-lg"
        >
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ivory/60">
              Attendance
            </label>
            <select
              name="status"
              defaultValue={statusFilter}
              className="mt-1 w-full rounded-full border border-gold/30 bg-navy px-4 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="all">All</option>
              <option value="attending">Coming</option>
              <option value="not_attending">Not coming</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ivory/60">
              Side
            </label>
            <select
              name="side"
              defaultValue={sideFilter}
              className="mt-1 w-full rounded-full border border-gold/30 bg-navy px-4 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="all">All</option>
              <option value="bride">Bride side</option>
              <option value="groom">Groom side</option>
            </select>
          </div>

          {/* 🚌 Шүүлтүүр: Нийтийн унаа */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ivory/60">
              Transport
            </label>
            <select
              name="transport"
              defaultValue={transportFilter}
              className="mt-1 w-full rounded-full border border-gold/30 bg-navy px-4 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="all">All</option>
              <option value="yes">need</option>
              <option value="no">no need</option>
            </select>
          </div>

          {/* 🏰 Шүүлтүүр: Хонох байрлах */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ivory/60">
              Accommodation
            </label>
            <select
              name="accommodation"
              defaultValue={accommodationFilter}
              className="mt-1 w-full rounded-full border border-gold/30 bg-navy px-4 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="all">All</option>
              <option value="yes">Need</option>
              <option value="no">No need</option>
            </select>
          </div>

          {/* 🎤 Шүүлтүүр: Үг хэлэх */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ivory/60">
              Speech
            </label>
            <select
              name="speech"
              defaultValue={speechFilter}
              className="mt-1 w-full rounded-full border border-gold/30 bg-navy px-4 py-2 text-xs text-ivory focus:border-gold focus:outline-none"
            >
              <option value="all">All</option>
              <option value="yes">Speech guest</option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 sm:col-span-1 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy hover:opacity-90 transition cursor-pointer shadow-md"
          >
            Filter
          </button>

          {(statusFilter !== 'all' ||
            sideFilter !== 'all' ||
            transportFilter !== 'all' ||
            accommodationFilter !== 'all' ||
            speechFilter !== 'all') && (
            <a
              href="/admin"
              className="col-span-2 sm:col-span-1 text-center text-xs text-ivory/50 underline underline-offset-4 hover:text-ivory py-2"
            >
              Clear Filter
            </a>
          )}

          <span className="col-span-2 sm:ml-auto text-xs text-ivory/50 text-right w-full sm:w-auto">
            {filteredGuests.length} family found
          </span>
        </form>

        {/* 📋 ӨРГӨТГӨСӨН ӨГӨГДЛИЙН ХҮСНЭГТ */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gold/20 shadow-2xl bg-[#142038]/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-gold/20 bg-[#142038]/50 text-xs uppercase tracking-[0.1em] text-ivory/50">
              <tr>
                <th className="px-4 py-3.5">Family</th>
                <th className="px-4 py-3.5">Side</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3">Members</th>
                <th className="px-4 py-3">Transport</th>
                <th className="px-4 py-3">Accommodation</th>
                <th className="px-4 py-3">Meal/Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((g) => (
                <tr
                  key={g.id}
                  className="border-b border-gold/10 align-top hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3.5 font-medium">{g.displayName}</td>
                  <td className="px-4 py-3.5 text-ivory/70 text-xs">
                    {sideLabels[g.side] ?? g.side}
                  </td>
                  <td className="px-4 py-3.5 text-xs">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        g.status === 'attending'
                          ? 'bg-gold/10 text-gold border border-gold/20'
                          : g.status === 'not_attending'
                            ? 'bg-burgundy/10 text-red-300 border border-burgundy/20'
                            : 'bg-white/5 text-ivory/40'
                      }`}
                    >
                      {statusLabels[g.status] ?? g.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs space-y-1">
                    {g.members.map((m) => (
                      <div
                        key={m.id}
                        className={
                          m.attending
                            ? 'flex items-center gap-1'
                            : 'text-ivory/30 line-through'
                        }
                      >
                        <span>• {m.name}</span>
                        {m.isChild && (
                          <span className="text-[10px] bg-gold/20 text-gold px-1 rounded">
                            Child
                          </span>
                        )}
                      </div>
                    ))}
                  </td>
                  {/* 5. Нийтийн унаа хэрэгтэй эсэх */}
                  <td className="px-4 py-3.5 text-center text-xs">
                    {g.status === 'attending'
                      ? g.needsTransport
                        ? '🚎 Yes'
                        : '❌ No'
                      : '—'}
                  </td>
                  {/* 6. Хонох байрлах өрөө хэрэгтэй эсэх */}
                  <td className="px-4 py-3.5 text-center text-xs">
                    {g.status === 'attending'
                      ? g.needsAccommodation
                        ? '🏰 Yes'
                        : '❌ No'
                      : '—'}
                  </td>
                  {/* 7. Хоолны харшил болон Ерөөлийн үг (Засварласан цэвэрхэн блок) */}
                  <td className="px-4 py-3.5 max-w-xs text-xs space-y-2">
                    {g.dietaryNotes && (
                      <div className="text-gold bg-gold/5 p-1.5 rounded border border-gold/10">
                        <strong>🍲 Allergy:</strong> {g.dietaryNotes}
                      </div>
                    )}
                    {g.message && (
                      <div className="text-ivory/70 italic bg-white/5 p-1.5 rounded whitespace-pre-wrap">
                        {g.message}
                      </div>
                    )}
                  </td>
                  {/* 8. Хариулсан огноо */}
                  <td className="px-4 py-3.5 text-xs text-ivory/50">
                    {g.respondedAt
                      ? new Date(g.respondedAt).toLocaleDateString('mn-MN')
                      : '—'}
                  </td>
                </tr>
              ))}
              {/* Шүүлтүүрт зочин олдоогүй үеийн хоосон мөр (Colspan-ийг 8 болгож засав) */}
              {filteredGuests.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-ivory/50 text-xs"
                  >
                    Haven't found any family.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
