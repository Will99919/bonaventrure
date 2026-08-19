import { prisma } from "@/lib/prisma";
import { DEFAULT_TEXTS } from "@/lib/content";
import { AdminApp } from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [texts, looks, posts, faqs, appointments] = await Promise.all([
    prisma.texts.findUnique({ where: { id: 1 } }),
    prisma.look.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.post.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const data = {
    texts: {
      heroTitle: texts?.heroTitle ?? DEFAULT_TEXTS.heroTitle,
      heroIntro: texts?.heroIntro ?? DEFAULT_TEXTS.heroIntro,
      manifeste: texts?.manifeste ?? DEFAULT_TEXTS.manifeste,
      bio: texts?.bio ?? DEFAULT_TEXTS.bio,
      citation: texts?.citation ?? DEFAULT_TEXTS.citation,
      contact: texts?.contact ?? DEFAULT_TEXTS.contact,
      portraitImage: texts?.portraitImage ?? null,
    },
    looks,
    posts,
    faqs,
    appointments: appointments.map((appointment) => ({
      ...appointment,
      createdAt: appointment.createdAt.toISOString(),
    })),
  };

  return <AdminApp data={data} />;
}
