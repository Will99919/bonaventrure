import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { AppointmentStatus } from "@/generated/prisma/enums";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await request.json();

  if (!Object.values(AppointmentStatus).includes(body.status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: body.status },
  });

  return NextResponse.json(appointment);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await prisma.appointment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
