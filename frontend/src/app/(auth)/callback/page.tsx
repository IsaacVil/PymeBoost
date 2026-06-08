"use client";
// Auth0 callback: exchange code for token, store in authStore, redirect

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function CallbackPage() {
  const router = useRouter();
  const { setSession } = useAuthStore();

  useEffect(() => {
    // TODO: Exchange Auth0 code for JWT, call setSession(), redirect to /dashboard
    router.push("/dashboard");
  }, [router, setSession]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 animate-pulse">Authenticating…</p>
    </div>
  );
}
