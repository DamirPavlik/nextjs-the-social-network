import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./decrypt";
import { encrypt } from "./encrypt";

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const expirationTime = Number(process.env.JWT_EXPIRATION_TIME);

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expirationTime * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
