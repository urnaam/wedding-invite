import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // always show fresh RSVP data

export default async function AdminDashboard() {
  const guests = await prisma.guest.findMany({
    include: { members: true },
    orderBy: { displayName: "asc" },
  });

  const totalFamilies = guests.length;
  const attendingFamilies = guests.filter((g) => g.status === "attending").length;
  const notAttendingFamilies = guests.filter((g) => g.status === "not_attending").length;
  const pendingFamilies = guests.filter((g) => g.status === "pending").length;
  const totalPeopleComing = guests
    .filter((g) => g.status === "attending")
    .reduce((sum, g) => sum + g.members.filter((m) => m.attending).length, 0);

  const statCards = [
    ["Гэр бүл, нийт", totalFamilies],
    ["Ирнэ гэсэн", attendingFamilies],
    ["Явахгүй гэсэн", notAttendingFamilies],
    ["Хариулаагүй", pendingFamilies],
    ["Ирэх хүний тоо", totalPeopleComing],
  ] as const;

  return (
    <main className="min-h-screen bg-navy px-6 py-16 text-ivory">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-4xl italic">RSVP Admin</h1>
          <div className="flex gap-3">
            <a
              href="/api/admin/export"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm uppercase tracking-[0.1em] hover:bg-gold hover:text-navy"
            >
              CSV татах
            </a>
            <form action="/api/admin/logout" method="POST">
              <button className="rounded-full border border-ivory/20 px-5 py-2 text-sm uppercase tracking-[0.1em] text-ivory/70 hover:border-ivory/50">
                Гарах
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {statCards.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-gold/20 p-4 text-center">
              <div className="font-display text-3xl text-gold">{value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.1em] text-ivory/60">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-gold/20">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-gold/20 text-xs uppercase tracking-[0.1em] text-ivory/50">
              <tr>
                <th className="px-4 py-3">Гэр бүл</th>
                <th className="px-4 py-3">Төлөв</th>
                <th className="px-4 py-3">Гишүүд</th>
                <th className="px-4 py-3">Мессеж</th>
                <th className="px-4 py-3">Огноо</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g.id} className="border-b border-gold/10 align-top">
                  <td className="px-4 py-3 font-medium">{g.displayName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        g.status === "attending"
                          ? "text-gold"
                          : g.status === "not_attending"
                          ? "text-burgundy"
                          : "text-ivory/50"
                      }
                    >
                      {g.status === "attending"
                        ? "Ирнэ"
                        : g.status === "not_attending"
                        ? "Явахгүй"
                        : "Хариулаагүй"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {g.members.map((m) => (
                      <div key={m.id} className={m.attending ? "" : "text-ivory/40 line-through"}>
                        {m.name}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 max-w-xs text-ivory/70">{g.message}</td>
                  <td className="px-4 py-3 text-ivory/50">
                    {g.respondedAt ? new Date(g.respondedAt).toLocaleDateString("mn-MN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
