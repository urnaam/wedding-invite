// Sample seed data — replace with your real guest list.
// Run with: npm run seed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.guest.deleteMany({});
  await prisma.guest.create({
    data: {
      slug: 'myagmarjav',
      displayName: 'Мягмаржав',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Цэнгэлмаа' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'batkhishig',
      displayName: 'Батхишиг',
      language: 'nl',
      side: 'bride',
      members: {
        create: [{ name: 'Karel' }, { name: 'Karel mom' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'bold',
      displayName: 'Болдоо ах',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'Өнөрөө эгч' },
          { name: 'Тогтуун' },
          { name: 'Баттогтох' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'tsoomoo',
      displayName: 'Цоомоо эгч',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'galiunaa',
      displayName: 'Galiunaa',
      language: 'nl',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'orgil',
      displayName: 'Оргио ах',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'Баярцэнгэл (эхнэр)' },
          { name: 'Аялуун Мандах', isChild: true },
          { name: 'Намуун Мандах', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'batbileg',
      displayName: 'Билгээ эгч',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'ider',
      displayName: 'Идэр',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'maral',
      displayName: 'Марал',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'atarbold',
      displayName: 'Атраа ах',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Мөнхөөлөй' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'batgerel',
      displayName: 'Гэрлээ эгч',
      language: 'de',
      side: 'bride',
      members: {
        create: [
          { name: 'Helge' },
          { name: 'Tamir' },
          { name: 'Consti', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'jagaa',
      displayName: 'Жагаа эгч',
      language: 'de',
      side: 'bride',
      members: {
        create: [{ name: 'Robert Lehmann' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'bayarlakh',
      displayName: 'Баярлах',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'Мөөгий' },
          { name: 'Номуунхүслэн', isChild: true },
          { name: 'Номуунзул', isChild: true },
          { name: 'Билгүүн' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'boogii',
      displayName: 'Боогий ах',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'Цэцэгхорлоо (эхнэр)' },
          { name: 'Christian' },
          { name: 'Мишээл' },
          { name: 'Эрдэм', isChild: true },
          { name: 'Маргад' },
          { name: 'Зулаа', isChild: true },
          { name: 'Золоо', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'sunjidmaa',
      displayName: 'Сүнжээ эгч',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'Долзодмаа эмээ' },
          { name: 'Амгалан' },
          { name: 'Нандиа' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'khandaa',
      displayName: 'Хандаа эгч',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Одонбаяр (нөхөр)' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'nomin',
      displayName: 'Номин',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'sersmaa',
      displayName: 'Сэрсмаа эгч',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'urangoo',
      displayName: 'Урангоо',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Галаа' }, { name: 'охин', isChild: true }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'ari',
      displayName: 'Ариунцэцэг',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Сосорбарам' }, { name: 'Энхтайван', isChild: true }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'ami',
      displayName: 'Амина',
      language: 'mn',
      side: 'bride',
      members: {
        create: [
          { name: 'ээж' },
          { name: 'Билгүүн' },
          { name: 'Хүслэн', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'galym',
      displayName: 'Galym',
      language: 'en',
      side: 'bride',
      members: {
        create: [{ name: 'wife' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'adi',
      displayName: 'Aditya',
      language: 'en',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'zoloo',
      displayName: 'Золзаяа',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'tseenee',
      displayName: 'Цээнээ',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'Балу' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'duunaa',
      displayName: 'Дуунаа',
      language: 'mn',
      side: 'bride',
      members: {
        create: [{ name: 'найз залуу' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'densmaa',
      displayName: 'Дэнсмаа',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'shika',
      displayName: 'Shika',
      language: 'en',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'donald',
      displayName: 'Donald',
      language: 'en',
      side: 'bride',
      members: {
        create: [{ name: 'wife' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'khaliunaa',
      displayName: 'Халиунаа',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'senie',
      displayName: 'Senie',
      language: 'en',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'joon',
      displayName: 'Joon',
      language: 'en',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'gabie',
      displayName: 'Gabie',
      language: 'en',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'turuu',
      displayName: 'Төрөө',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'naraa',
      displayName: 'Нараа',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'enkhamar',
      displayName: 'Энх-Амар',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'namuun',
      displayName: 'Намуун',
      language: 'mn',
      side: 'bride',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'udval',
      displayName: 'Удвал',
      language: 'mn',
      side: 'bride',
    },
  });

  await prisma.guest.create({
    data: {
      slug: 'thai',
      displayName: 'Thai Caroline',
      language: 'yue',
      side: 'groom',
      members: {
        create: [{ name: 'Ly Vinh Mau' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'celine',
      displayName: 'Fourrier Celine',
      language: 'fr',
      side: 'groom',
      members: {
        create: [
          { name: 'Fourrier Jason' },
          { name: 'Fourrier Jenny', isChild: true },
          { name: 'Fourrier Kelly', isChild: true },
          { name: 'Fourrier Tiffany', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'valentin',
      displayName: 'Ly Valentin',
      language: 'fr',
      side: 'groom',
      members: {
        create: [
          { name: 'Rosa Marine ' },
          { name: 'Ly Erwann', isChild: true },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'christian',
      displayName: 'Wong Christian',
      language: 'fr',
      side: 'groom',
      members: {
        create: [
          { name: 'Wong Adeline' },
          { name: 'Wong Christine' },
          { name: 'Wong Daniel' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'jonathan',
      displayName: 'Ma Jonathan',
      language: 'fr',
      side: 'groom',
      members: {
        create: [
          { name: 'Ma Valentine' },
          { name: 'Ma Alexis' },
          { name: 'Ma Jordy' },
          { name: 'Ma Melainie' },
          { name: 'Ma Pauline' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'paul',
      displayName: 'Thai Paul',
      language: 'fr',
      side: 'groom',
      members: {
        create: [{ name: 'Thai Jema ' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'antoine',
      displayName: 'Thai Antoine',
      language: 'fr',
      side: 'groom',
      members: {
        create: [
          { name: 'Thai Leang' },
          { name: 'Thai Ambre' },
          { name: 'Thai Benjamin' },
        ],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'quentin',
      displayName: 'Ordan Quentin',
      language: 'fr',
      side: 'groom',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'arthur',
      displayName: 'Coin Arthur',
      language: 'fr',
      side: 'groom',
      members: {
        create: [{ name: 'Belda Romane' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'yanis',
      displayName: 'Abid Charef Yanis',
      language: 'fr',
      side: 'groom',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'julien',
      displayName: 'Francois Julien',
      language: 'fr',
      side: 'groom',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'paulin',
      displayName: 'Montabert Paulin',
      language: 'fr',
      side: 'groom',
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'konstatina',
      displayName: 'Topka Konstantina',
      language: 'fr',
      side: 'groom',
      members: {
        create: [{ name: 'Grao Matthieu' }],
      },
    },
  });
  await prisma.guest.create({
    data: {
      slug: 'mathilde',
      displayName: 'Lefebvre Mathilde',
      language: 'fr',
      side: 'groom',
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
