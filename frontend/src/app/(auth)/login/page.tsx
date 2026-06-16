import Link from "next/link";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/shared/components/layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900">Sign in to PymeBoost</h2>
          <p className="mt-2 text-zinc-500">Connect with advisors that move the needle</p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-teal-600 hover:underline">
            Create one
          </Link>
        </p>

        <div className="rounded-md border border-zinc-300 bg-zinc-50 p-3 text-center text-xs text-zinc-500">
          Demo: <span className="font-mono">maria@cafedelvalle.cr</span> ·{" "}
          <span className="font-mono">DemoPass123!</span>
        </div>
      </div>
    </AuthLayout>
  );
}
