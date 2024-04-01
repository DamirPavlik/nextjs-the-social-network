import { SignJWT } from "jose";

export async function encrypt(payload: any) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expirationTime = Number(process.env.JWT_EXPIRATION_TIME);

  const textEncoder = new TextEncoder();
  const secretKeyParsed = textEncoder.encode(secretKey);

  const expirationTimeParsed = new Date(
    new Date().getTime() + expirationTime * 24 * 60 * 60 * 1000
  );

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTimeParsed)
    .sign(secretKeyParsed);
}
