import { jwtDecode } from "jwt-decode";

export function debounce(fn: (value: string) => void) {
  let timerId: NodeJS.Timeout;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(value), 300);
  };
}

interface DecodedToken {
  email?: string;
  user_id?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}

export function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
