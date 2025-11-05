"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromStorage } from "../utils/utils";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = getTokenFromStorage();

    if (requireAuth && !token) {
      router.push("/login");
    } else if (!requireAuth && token) {
      router.push("/products");
    } else {
      setIsChecking(false);
    }
  }, [requireAuth, router]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
