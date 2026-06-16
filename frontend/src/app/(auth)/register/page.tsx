import Link from "next/link";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { AuthLayout } from "@/shared/components/layouts/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900">Create your account</h2>
          <p className="mt-2 text-zinc-500">Join PymeBoost as a PYME or an Advisor</p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
