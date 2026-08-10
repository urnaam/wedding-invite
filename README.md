# Хуримын урилгын вэбсайт

Next.js 14 (App Router) + Tailwind + Framer Motion + Prisma дээр бүтээсэн.

## Юу орсон бэ
- Тамга нээх motion эффект (нүүр хуудас нээгдэхэд), дараа нь хөгжим асаах товч
- Countdown timer + "Google Calendar-т нэмэх" товч (`src/config/wedding.ts`-д огноог тохируулна)
- Google Maps embed + чиглэл авах товч
- Dress code хэсэг (өнгөний палитар зурагнаас авсан: navy/burgundy/gold)
- Зочдын нэрээр хайж олоод хувийн RSVP хуудас руу орох (`/rsvp/[slug]`)
- Гэр бүлийн гишүүн бүрийг тус тусад нь сонгох, "Явахгүй" гэвэл сайн сайхан хүсэл бичих талбар
- Хариултууд болон мессежийг Prisma-гаар DB-д хадгална

## 1. Суулгах (network байгаа компьютер дээрээ)
```
npm install
```

## 2. Өгөгдлийн сан (database)
Энэ бол Postgres ашигладаг (`prisma/schema.prisma`). Хамгийн хялбар бөгөөд **үнэгүй** сонголт:

1. https://supabase.com дээр account үүсгэж project нээнэ (эсвэл https://neon.tech / Vercel Postgres — бүгд адилхан ажиллана)
2. Project Settings → Database → Connection string (URI, "Transaction pooler")-ийг хуулна
3. `.env.example`-ийг `.env` болгож хуулаад `DATABASE_URL`-д тэр connection string-ийг тавина
4. Migration ажиллуулна:
```
npx prisma migrate dev --name init
```
5. Жишээ зочны мэдээлэл оруулах (`prisma/seed.ts`-ийг өөрийн жинхэнэ зочдын жагсаалтаар солино):
```
npm run seed
```

## 3. Тохиргоо хийх
`src/config/wedding.ts` файлыг нээгээд:
- огноо/цаг, venue (нэр, хаяг), dress code текст, өнгө зэргийг өөрчил
- `public/music.mp3` дотор өөрийн хөгжмийн файлыг тавь (эрх зөвшөөрөлтэй/өөрийн MP3)

## 4. Локал дээр туршиж үзэх
```
npm run dev
```
http://localhost:3000 нээнэ

## 5. Deploy хийх (Vercel санал болгож байна)
1. Кодоо GitHub-т push хийнэ
2. https://vercel.com дээр repo-г холбож import хийнэ
3. Vercel dashboard дээр Environment Variables-д `DATABASE_URL`-ээ нэмнэ
4. Deploy дараад бэлэн боллоо

## Зочдод хувийн холбоос илгээх
Зочин бүр `slug`-тай (жишээ нь `bat-tsetseg`). Тэдэнд шууд
`https://таны-домэйн/rsvp/bat-tsetseg` холбоосыг илгээж болно (Facebook Messenger, WhatsApp, имэйл гэх мэт),
эсвэл нүүр хуудасны хайлтаар нэрээ бичиж олох боломжтой.

## Admin dashboard
`/admin` дээр бүх зочдын хариултыг нэг дороос харна:
- Статистик (нийт гэр бүл, ирнэ/явахгүй/хариулаагүй тоо, нийт ирэх хүний тоо)
- Гэр бүл бүрийн гишүүдийн ирэх эсэх, бичсэн мессеж
- CSV татах товч (хуримын өдрийн жагсаалт хэвлэхэд хэрэгтэй)

Нэвтрэхийн тулд `.env`-д `ADMIN_PASSWORD`-аа тохируулна (жишээ нь сайн нууц үг). Дараа нь
`https://таны-домэйн/admin` руу орж тэр нууц үгээ оруулна. Cookie 8 цагийн турш хүчинтэй.

## Дараа нь нэмж болох зүйлс
- Япон/Англи хэлний орчуулга (Guest.language талбар аль хэдийн бэлэн байгаа тул сунгахад амархан)
