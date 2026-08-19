import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const FIELDS = [
  "heroTitle",
  "heroIntro",
  "manifeste",
  "bio",
  "citation",
  "contact",
  "portraitImage",
] as const;

export async function PATCH(request: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const data: Record<string, string> = {};
  for (const field of FIELDS) {
    if (typeof body[field] === "string") data[field] = body[field];
  }

  const texts = await prisma.texts.upsert({
    where: { id: 1 },
    create: { id: 1, ...data },
    update: data,
  });

  revalidatePath("/");
  return NextResponse.json(texts);
}
