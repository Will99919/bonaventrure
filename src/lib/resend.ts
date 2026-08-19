import { Resend } from "resend";

export async function sendAppointmentEmail(params: {
  name: string;
  contact: string;
  message: string;
}) {
  const to = process.env.APPOINTMENT_NOTIFY_EMAIL;
  if (!to || !process.env.RESEND_API_KEY) {
    console.warn("Resend not configured, skipping appointment email.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Bonaventure <onboarding@resend.dev>",
    to,
    replyTo: params.contact,
    subject: `Nouvelle demande de rendez-vous — ${params.name}`,
    text: `${params.name}\n${params.contact}\n\n${params.message}`,
  });
}
