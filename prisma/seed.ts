import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  DEFAULT_FAQS,
  DEFAULT_LOOKS,
  DEFAULT_POSTS,
  DEFAULT_TEXTS,
} from "../src/lib/default-content";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });

  await prisma.texts.upsert({
    where: { id: 1 },
    create: { id: 1, ...DEFAULT_TEXTS },
    update: {},
  });

  // Contenu de démarrage, uniquement si la table est encore vide :
  // la styliste peut le remplacer par ses propres pièces depuis le back-office.
  if ((await prisma.look.count()) === 0) {
    await prisma.look.createMany({ data: DEFAULT_LOOKS });
  }
  if ((await prisma.post.count()) === 0) {
    await prisma.post.createMany({ data: DEFAULT_POSTS });
  }
  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({ data: DEFAULT_FAQS });
  }

  console.log(`Admin user ready: ${email}`);
  console.log(
    `Content: ${await prisma.look.count()} looks, ${await prisma.post.count()} posts, ${await prisma.faq.count()} faqs`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
