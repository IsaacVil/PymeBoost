import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-8">
      <section className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-zinc-900">
          Connect your SME with the right advisor
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
          PymeBoost uses AI to match your business with verified specialists,
          track performance, and deliver measurable results.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/matching"
            className="bg-zinc-50 border-2 border-zinc-800 text-zinc-900 px-6 py-3 rounded-md font-medium hover:bg-zinc-100 transition-colors"
          >
            Browse Advisors
          </Link>
        </div>
      </section>
    </main>
  );
}
