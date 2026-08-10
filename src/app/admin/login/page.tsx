export default function AdminLogin({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6">
      <form
        action="/api/admin/login"
        method="POST"
        className="w-full max-w-sm rounded-2xl border border-gold/30 p-8 text-center"
      >
        <h1 className="font-display text-3xl italic text-ivory">Admin</h1>
        <p className="mt-2 text-sm text-ivory/60">Зочдын хариултыг харах</p>

        <input
          type="password"
          name="password"
          placeholder="Нууц үг"
          required
          className="mt-6 w-full rounded-full border border-gold/40 bg-transparent px-5 py-3 text-center text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
        />

        {searchParams?.error && (
          <p className="mt-3 text-sm text-burgundy">Нууц үг буруу байна.</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-gold py-3 text-sm uppercase tracking-[0.15em] text-navy hover:opacity-90"
        >
          Нэвтрэх
        </button>
      </form>
    </main>
  );
}
