"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { MatchingGrid } from "./components/MatchingGrid";
import { useAdvisorMatching } from "./hooks/useAdvisorMatching";
import { useAuthStore } from "@/store/authStore";

export default function MatchingPage() {
  const { session } = useAuthStore();
  const { recommendations, isLoading, error, swipeApproved, swipeRejected } =
    useAdvisorMatching({ pymeId: session.userId ?? "" });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Find Advisors</h1>
          <p className="text-zinc-500 mt-1">
            AI-matched advisors based on your business profile. Swipe to connect.
          </p>
        </div>

        {isLoading && (
          <p className="text-zinc-400 animate-pulse">Finding your best matches…</p>
        )}

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {!isLoading && recommendations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500">No recommendations available yet.</p>
            <p className="text-zinc-400 text-sm mt-1">Complete your business profile to get AI-matched advisors.</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <MatchingGrid
            matches={recommendations}
            onApprove={swipeApproved}
            onReject={swipeRejected}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
