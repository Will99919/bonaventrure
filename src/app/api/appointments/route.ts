import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { sendAppointmentEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, contact, message, website } = body as {
    name?: string;
    contact?: string;
    message?: string;
    website?: string; // honeypot field, must stay empty
  };

  if (typeof website === "string" && website.trim() !== "") {
    // Bot filled the honeypot field — pretend success, do nothing.
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    contact.trim().length < 3 ||
    message.trim().length < 5
  ) {
    return NextResponse.json({ error: "Formulaire incomplet." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Merci de réessayer plus tard." },
      { status: 429 }
    );
  }

  const appointment = await prisma.appointment.create({
    data: { name: name.trim(), contact: contact.trim(), message: message.trim() },
  });

  await sendAppointmentEmail({ name: appointment.name, contact: appointment.contact, message: appointment.message });

  return NextResponse.json({ ok: true });
}
