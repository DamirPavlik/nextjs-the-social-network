import { jwtVerify } from "jose";

export async function decrypt(input: string): Promise<any> {
  const secretKey = process.env.JWT_SECRET_KEY;
  const textEncoder = new TextEncoder();
  const secretKeyParsed = textEncoder.encode(secretKey);
  const { payload } = await jwtVerify(input, secretKeyParsed, {
    algorithms: ["HS256"],
  });
  return payload;
}
