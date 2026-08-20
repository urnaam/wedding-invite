import { prisma } from '@/lib/prisma';
import SiteExperience from '@/components/SiteExperience';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const cleanSlug = params.slug.toLowerCase();

  const guest = await prisma.guest.findUnique({
    where: { slug: cleanSlug },
  });

  return (
    <SiteExperience
      slug={cleanSlug}
      initialLang={guest?.language || undefined}
    />
  );
}
