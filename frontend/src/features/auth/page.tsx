// Re-export: auth routes live under app/(auth)/
// This page is a fallback redirect
import { redirect } from "next/navigation";

export default function AuthPage() {
  redirect("/auth/login");
}
