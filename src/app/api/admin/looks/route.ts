import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { LookCategory } from "@/generated/prisma/enums";

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  // MAX(order) + 1, et non count() : après une suppression, le nombre de lignes
  // restantes ne correspond plus au prochain rang libre (collisions d'`order`).
  const { _max } = await prisma.look.aggregate({ _max: { order: true } });
  const nextOrder = (_max.order ?? -1) + 1;

  const look = await prisma.look.create({
    data: {
      name: typeof body.name === "string" ? body.name : "Sans titre",
      category: Object.values(LookCategory).includes(body.category)
        ? body.category
        : LookCategory.Vestiaire,
      year: typeof body.year === "string" ? body.year : "",
      note: typeof body.note === "string" ? body.note : "",
      image: typeof body.image === "string" ? body.image : null,
      order: nextOrder,
    },
  });

  revalidatePath("/");
  return NextResponse.json(look, { status: 201 });
}
