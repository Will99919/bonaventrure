import { prisma } from "@/lib/prisma";
import {
  DEFAULT_FAQS,
  DEFAULT_LOOKS,
  DEFAULT_POSTS,
  DEFAULT_TEXTS,
} from "@/lib/default-content";
import type { LookCategory } from "@/generated/prisma/enums";

export { DEFAULT_TEXTS };

export type Content = {
  texts: typeof DEFAULT_TEXTS & { portraitImage: string | null };
  looks: Array<{
    id: string;
    name: string;
    category: LookCategory;
    year: string;
    note: string;
    image: string | null;
    order: number;
  }>;
  posts: Array<{ id: string; caption: string; image: string | null; order: number }>;
  faqs: Array<{ id: string; question: string; answer: string; order: number }>;
};

export async function getContent(): Promise<Content> {
  const [texts, looks, posts, faqs] = await Promise.all([
    prisma.texts.findUnique({ where: { id: 1 } }),
    prisma.look.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.post.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
  ]);

  return {
    texts: {
      heroTitle: texts?.heroTitle || DEFAULT_TEXTS.heroTitle,
      heroIntro: texts?.heroIntro || DEFAULT_TEXTS.heroIntro,
      manifeste: texts?.manifeste || DEFAULT_TEXTS.manifeste,
      bio: texts?.bio || DEFAULT_TEXTS.bio,
      citation: texts?.citation || DEFAULT_TEXTS.citation,
      contact: texts?.contact || DEFAULT_TEXTS.contact,
      portraitImage: texts?.portraitImage || null,
    },
    looks:
      looks.length > 0
        ? looks
        : DEFAULT_LOOKS.map((look, index) => ({
            ...look,
            id: `default-look-${index + 1}`,
            image: null,
          })),
    posts:
      posts.length > 0
        ? posts
        : DEFAULT_POSTS.map((post, index) => ({
            ...post,
            id: `default-post-${index + 1}`,
            image: null,
          })),
    faqs:
      faqs.length > 0
        ? faqs
        : DEFAULT_FAQS.map((faq, index) => ({ ...faq, id: `default-faq-${index + 1}` })),
  };
}
