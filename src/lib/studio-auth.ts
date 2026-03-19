import { createHmac, timingSafeEqual } from "node:crypto";

export const STUDIO_SESSION_COOKIE = "__geminox_studio";

function getStudioPassword() {
  return process.env.STUDIO_PASSWORD?.trim() ?? "";
}

export function isStudioConfigured() {
  return getStudioPassword().length > 0;
}

export function getStudioSessionValue() {
  const password = getStudioPassword();

  if (!password) {
    return "";
  }

  return createHmac("sha256", password).update("geminox-studio").digest("hex");
}

export function isStudioSessionValid(value?: string | null) {
  const expected = getStudioSessionValue();

  if (!value || !expected || value.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export function isStudioCookieStoreAuthenticated(cookieStore: {
  get: (name: string) => { value: string } | undefined;
}) {
  return isStudioSessionValid(cookieStore.get(STUDIO_SESSION_COOKIE)?.value);
}
