import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { cookies } from "next/headers";
import { encrypt } from "./encrypt";
import { join } from "path";
import { writeFile } from "fs/promises";
import { DIR_NAME, SITE_URL } from "../constants";

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

  const file: File | null = user.profilePhoto as unknown as File;

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
      });
    }

    if (file.name !== "undefined") {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const path = join(DIR_NAME, "../../public/profilePhotos", file.name);
      await writeFile(path, buffer);

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          photoURL: `${SITE_URL}profilePhotos/${file.name}`,
        });
      }
    } else if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        photoURL: `${SITE_URL}profilePhotos/default-avatar.png`,
      });
    }

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log("Error in loggin in:", error);
    return;
  }
}
