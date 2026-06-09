"use client";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/shared/components/ui/Card";
import { Match } from "../types/matching";

interface MatchingCardProps {
  match: Match;
  onApprove: (advisorId: string) => Promise<void>;
  onReject: (advisorId: string) => Promise<void>;
}

export function MatchingCard({ match, onApprove, onReject }: MatchingCardProps) {
  return (
    <Card>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <CardTitle>{match.advisorName}</CardTitle>
          <p className="text-sm text-zinc-500">{match.industry}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400">Compatibility</span>
          <span className="text-lg font-bold text-teal-500">{match.compatibilityScore}/5</span>
        </div>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-2 mb-3">
        {match.specializations.map((s) => (
          <Badge key={s} status="neutral" label={s} />
        ))}
      </div>

      {/* Previous project */}
      <CardContent className="mb-3">
        <p className="text-xs font-mono text-zinc-400 mb-1">Previous project</p>
        <p className="text-sm font-medium text-zinc-900">{match.previousProject.name}</p>
        <p className="text-sm text-zinc-500">{match.previousProject.description}</p>
      </CardContent>

      {/* Estimated impact */}
      <div className="bg-teal-500/10 border border-teal-500/30 rounded-md px-3 py-2 mb-4">
        <p className="text-xs font-mono text-zinc-400">Estimated impact</p>
        <p className="text-sm font-medium text-teal-600">{match.estimatedMetricImprovement}</p>
      </div>

      {/* Earnings */}
      <div className="flex justify-between text-xs text-zinc-400 mb-4 font-mono">
        <span>Advisor {match.earningsDistribution.advisorPercentage}%</span>
        <span>PymeBoost {match.earningsDistribution.pymeBoostPercentage}%</span>
        <span>~${match.earningsDistribution.estimatedMonthlyUSD}/mo</span>
      </div>

      {/* Swipe actions */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onReject(match.advisorId)}
        >
          Swipe Rejected
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onApprove(match.advisorId)}
        >
          Swipe Approved
        </Button>
      </div>
    </Card>
  );
}
