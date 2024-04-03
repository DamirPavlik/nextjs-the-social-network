import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("session");
  signOut(auth);
}
