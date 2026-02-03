"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, isLoggedIn } from "@/lib/api/auth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
    else if (!isAdmin()) router.push("/auth/dashboard");
  }, []);

  return <>{children}</>;
}
