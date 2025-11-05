"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getTokenFromStorage,
  decodeToken,
  isTokenExpired,
} from "../utils/utils";
import { useAuth } from "../context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getTokenFromStorage();

    if (requireAuth) {
      if (!token) {
        router.push("/login");
        return;
      }

      if (isTokenExpired(token)) {
        logout();
        router.push("/login");
        return;
      }

      const decoded = decodeToken(token);
      if (!decoded || !decoded.email) {
        logout();
        router.push("/login");
        return;
      }

      setIsChecking(false);
    } else if (!requireAuth && token) {
      router.push("/products");
    } else {
      setIsChecking(false);
    }
  }, [requireAuth, router, logout]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
