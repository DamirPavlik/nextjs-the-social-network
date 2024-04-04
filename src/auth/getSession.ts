import { cookies } from "next/headers";
import { decrypt } from "./decrypt";

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return;
  return await decrypt(session);
}
