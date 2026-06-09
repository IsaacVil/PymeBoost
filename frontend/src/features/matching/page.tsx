"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Badge } from "@/shared/components/ui/Badge";
import { useAdvisorMatching } from "./hooks/useAdvisorMatching";
import { useAuthStore } from "@/store/authStore";

export default function MatchingPage() {
  const { session } = useAuthStore();
  const {
    matches, isLoading, formData,
    updateFormData, performMatching, selectAdvisor,
  } = useAdvisorMatching({ pymeId: session.userId ?? "", strategy: "ai" });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Find Advisors</h1>
          <p className="text-zinc-500 mt-1">Describe your challenge and we'll match the right specialist.</p>
        </div>

        <Card>
          <div className="space-y-4">
            <Input
              label="Industry"
              placeholder="e.g. Retail, Technology, Manufacturing"
              value={formData.industry}
              onChange={(e) => updateFormData({ industry: e.target.value })}
            />
            <Input
              label="Main challenge"
              placeholder="e.g. Reduce operational costs by 20%"
              value={formData.challenge}
              onChange={(e) => updateFormData({ challenge: e.target.value })}
            />
            <div className="flex gap-4">
              <Input
                label="Budget (USD)"
                type="number"
                value={formData.budget}
                onChange={(e) => updateFormData({ budget: Number(e.target.value) })}
              />
              <Input
                label="Timeline (weeks)"
                type="number"
                value={formData.timeline}
                onChange={(e) => updateFormData({ timeline: Number(e.target.value) })}
              />
            </div>
            <Button onClick={performMatching} isLoading={isLoading}>
              Find Matching Advisors
            </Button>
          </div>
        </Card>

        {matches.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900">Best Matches</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {matches.map((match) => (
                <Card key={match.advisorId}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-zinc-900">Advisor #{match.advisorId}</p>
                      <p className="text-sm text-zinc-500 mt-1">{match.reason}</p>
                    </div>
                    <Badge status="active" label={`${match.matchScore}%`} />
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                    onClick={() => selectAdvisor(match.advisorId, match.advisorId)}
                  >
                    Connect
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
