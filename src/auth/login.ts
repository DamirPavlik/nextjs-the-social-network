import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { encrypt } from "./encrypt";

export async function login(formData: FormData) {
  const user = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  const expirationTime = Number(process.env.JWT_EXPIRATION_TIME);
  const expires = new Date(
    new Date().getTime() + expirationTime * 24 * 60 * 60 * 1000
  );

  const session = await encrypt({ user, expires });

  try {
    const res = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (res === null) {
      throw new Error("You suck");
    }
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log("Error in loggin in: ", error);
  }
}
