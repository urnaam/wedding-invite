import RsvpForm from "@/components/RsvpForm";

export default function RsvpPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-navy px-6 py-24">
      <RsvpForm slug={params.slug} />
    </main>
  );
}
