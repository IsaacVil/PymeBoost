"use client";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Match } from "../types/matching";

interface MatchingCardProps {
  match: Match;
  onSelect: (advisorId: string, matchId: string) => void;
}

export function MatchingCard({ match, onSelect }: MatchingCardProps) {
  // TODO: implement single advisor card UI
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-100">Advisor #{match.advisorId}</p>
          <p className="text-sm text-slate-400 mt-1">{match.reason}</p>
        </div>
        <Badge status="active" label={`${match.matchScore}%`} />
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="mt-4 w-full"
        onClick={() => onSelect(match.advisorId, match.advisorId)}
      >
        Connect
      </Button>
    </Card>
  );
}
