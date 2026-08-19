import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  // MAX(order) + 1, et non count() : après une suppression, le nombre de lignes
  // restantes ne correspond plus au prochain rang libre (collisions d'`order`).
  const { _max } = await prisma.post.aggregate({ _max: { order: true } });
  const nextOrder = (_max.order ?? -1) + 1;

  const post = await prisma.post.create({
    data: {
      caption: typeof body.caption === "string" ? body.caption : "",
      image: typeof body.image === "string" ? body.image : null,
      order: nextOrder,
    },
  });

  revalidatePath("/");
  return NextResponse.json(post, { status: 201 });
}
