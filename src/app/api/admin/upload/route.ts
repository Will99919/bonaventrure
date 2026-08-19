import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const { dataUrl, folder } = body as { dataUrl?: string; folder?: string };

  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
    return NextResponse.json({ error: "Image invalide" }, { status: 400 });
  }

  const validFolders = ["looks", "posts", "maison"] as const;
  const targetFolder = validFolders.includes(folder as (typeof validFolders)[number])
    ? (folder as (typeof validFolders)[number])
    : "looks";

  const url = await uploadImage(dataUrl, targetFolder);
  return NextResponse.json({ url });
}
