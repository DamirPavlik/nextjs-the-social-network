import { cookies } from "next/headers";
import { login } from "./login";

export async function handleLogin(formData: FormData) {
  const loginRes = await login(formData);
  if (loginRes !== null && typeof loginRes === "object") {
    let loginError = (loginRes as { code: string }).code
      .split("/")[1]
      .replaceAll("-", " ");
    cookies().set("loginError", loginError);
    return;
  }
}
