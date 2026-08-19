import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const DATA_URL_RE = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/;

export async function uploadImage(dataUrl: string, folder: string) {
  if (hasCloudinaryConfig) {
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: `bonaventure/${folder}`,
    });
    return result.secure_url;
  }

  // Pas de compte Cloudinary configuré : on écrit en local sous public/uploads
  // pour ne pas bloquer le développement. À remplacer par Cloudinary en prod
  // (voir docs/PROCHAINES-ETAPES.md).
  const match = dataUrl.match(DATA_URL_RE);
  if (!match) {
    throw new Error("Image invalide.");
  }
  const [, mime, base64] = match;
  const extension = mime.split("/")[1]?.replace("jpeg", "jpg") || "png";

  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${randomUUID()}.${extension}`;
  await writeFile(path.join(uploadsDir, filename), Buffer.from(base64, "base64"));

  return `/uploads/${folder}/${filename}`;
}

export { cloudinary, hasCloudinaryConfig };
