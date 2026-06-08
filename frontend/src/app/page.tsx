import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-8">
      <section className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-slate-100">
          Connect your SME with the right advisor
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          PymeBoost uses AI to match your business with verified specialists,
          track performance, and deliver measurable results.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/matching"
            className="bg-slate-800 border border-slate-700 text-slate-100 px-6 py-3 rounded-md font-medium hover:bg-slate-700 transition-colors"
          >
            Browse Advisors
          </Link>
        </div>
      </section>
    </main>
  );
}
