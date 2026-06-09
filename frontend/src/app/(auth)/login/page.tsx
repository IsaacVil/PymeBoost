import { AuthLayout } from "@/shared/components/layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900">Sign in to PymeBoost</h2>
          <p className="mt-2 text-zinc-500">Connect with advisors that move the needle</p>
        </div>
        {/* Auth0 login button rendered here */}
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-medium transition-colors">
          Continue with Google
        </button>
        <p className="text-center text-sm text-zinc-400">
          By signing in you agree to our Terms of Service
        </p>
      </div>
    </AuthLayout>
  );
}
