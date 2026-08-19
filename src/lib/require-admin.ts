import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { session: null, response: NextResponse.json({ error: "Non autorisé" }, { status: 401 }) };
  }
  return { session, response: null };
}
