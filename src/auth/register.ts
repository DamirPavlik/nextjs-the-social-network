import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { cookies } from "next/headers";
import { encrypt } from "./encrypt";
import { dirname, join } from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function register(formData: FormData) {
  const user = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    username: String(formData.get("username")),
    profilePhoto: formData.get("profilePhoto"),
  };

  const expirationTime = Number(process.env.JWT_EXPIRATION_TIME);
  const expires = new Date(
    new Date().getTime() + expirationTime * 24 * 60 * 60 * 1000
  );

  const session = await encrypt({ user, expires });

  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (res === null) {
      throw new Error("You suck");
    } else if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: user.username,
      }).then(() => {
        console.log("added username");
      });
    }

    if (user.profilePhoto) {
      const file: File | null = user.profilePhoto as unknown as File;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(__dirname, "../../public/profilePhotos", file.name); // Set path to the root of the project's public directory
      await writeFile(path, buffer);
    }

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log("Error in loggin in:", error);
    return;
  }
}
