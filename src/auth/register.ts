import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { cookies } from "next/headers";
import { encrypt } from "./encrypt";

export async function register(formData: FormData) {
  const user = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    username: String(formData.get("username")),
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
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log("Error in loggin in: ", error);
  }
}
