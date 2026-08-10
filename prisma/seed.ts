// Sample seed data — replace with your real guest list.
// Run with: npm run seed
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.guest.create({
    data: {
      slug: "bat-tsetseg",
      displayName: "Бат ба Цэцэг гэр бүл",
      language: "mn",
      members: {
        create: [
          { name: "Бат" },
          { name: "Цэцэг" },
          { name: "Наран (хүү)" },
        ],
      },
    },
  });

  await prisma.guest.create({
    data: {
      slug: "smith-family",
      displayName: "The Smith Family",
      language: "en",
      members: {
        create: [{ name: "John Smith" }, { name: "Anna Smith" }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
