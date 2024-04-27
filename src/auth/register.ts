import { updateProfile } from "firebase/auth";
import { cookies } from "next/headers";
import { encrypt } from "./encrypt";
import { SITE_URL } from "../constants";
import { saveProfilePicture } from "./saveProfilePicture";
import { createUser } from "./createUser";

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
    const userCreated = await createUser(
      user.email,
      user.password,
      user.username
    );

    if (!userCreated) {
      throw new Error("Unable to authenticate the user.");
    }

    const photoURL = await saveProfilePicture(file);

    await updateProfile(userCreated, {
      photoURL: photoURL || `${SITE_URL}profilePhotos/default-avatar.png`,
    });

    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    return error;
  }
}
