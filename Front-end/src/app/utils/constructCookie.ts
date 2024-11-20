import { CookieOptions } from "@/types/Actions";

export default function constructCookie(
  serializedCookie: string
): CookieOptions {
  const [cookieString, ...rest] = serializedCookie.split("; ");
  const [cookieName, authToken] = cookieString.split("=");
  const [maxAge, domain, path] = rest.map((str) => str.split("=")[1]);

  return {
    name: cookieName,
    value: authToken,
    path,
    maxAge: Number(maxAge),
    domain,
  };
}
