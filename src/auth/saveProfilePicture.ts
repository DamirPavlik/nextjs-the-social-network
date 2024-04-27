import { DIR_NAME, SITE_URL } from "@/constants";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function saveProfilePicture(file: any) {
  if (!file || file.name === "undefined") return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(DIR_NAME, "../../public/profilePhotos", file.name);

  await writeFile(path, buffer);

  return `${SITE_URL}profilePhotos/${file.name}`;
}
