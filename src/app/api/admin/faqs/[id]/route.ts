import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (typeof body.question === "string") data.question = body.question;
  if (typeof body.answer === "string") data.answer = body.answer;

  const faq = await prisma.faq.update({ where: { id }, data });
  revalidatePath("/");
  return NextResponse.json(faq);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
