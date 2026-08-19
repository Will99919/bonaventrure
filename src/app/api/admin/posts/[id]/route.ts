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
  if (typeof body.caption === "string") data.caption = body.caption;
  if (typeof body.image === "string") data.image = body.image;

  const post = await prisma.post.update({ where: { id }, data });
  revalidatePath("/");
  return NextResponse.json(post);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
