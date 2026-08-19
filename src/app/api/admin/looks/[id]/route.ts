import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { LookCategory } from "@/generated/prisma/enums";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await request.json();

  if (body.move === "up" || body.move === "down") {
    const current = await prisma.look.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

    const neighbor = await prisma.look.findFirst({
      where: body.move === "up" ? { order: { lt: current.order } } : { order: { gt: current.order } },
      orderBy: { order: body.move === "up" ? "desc" : "asc" },
    });

    if (neighbor) {
      await prisma.$transaction([
        prisma.look.update({ where: { id: current.id }, data: { order: neighbor.order } }),
        prisma.look.update({ where: { id: neighbor.id }, data: { order: current.order } }),
      ]);
    }

    revalidatePath("/");
    return NextResponse.json({ ok: true });
  }

  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = body.name;
  if (typeof body.year === "string") data.year = body.year;
  if (typeof body.note === "string") data.note = body.note;
  if (typeof body.image === "string") data.image = body.image;
  if (Object.values(LookCategory).includes(body.category)) data.category = body.category;

  const look = await prisma.look.update({ where: { id }, data });
  revalidatePath("/");
  return NextResponse.json(look);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await prisma.look.delete({ where: { id } });
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
