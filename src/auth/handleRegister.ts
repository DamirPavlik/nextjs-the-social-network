import { validateRegister } from "@/lib/validateRegister";
import { cookies } from "next/headers";
import { register } from "./register";
import { redirect } from "next/navigation";

export async function handleRegister(formData: FormData) {
  const errors = await validateRegister(formData);
  if (typeof errors === "object") {
    const stringyfied =
      typeof errors === "object" ? JSON.stringify(errors) : "true";
    cookies().set("registerError", stringyfied);
    redirect("/register");
    // return;
  }
  await register(formData);
}
