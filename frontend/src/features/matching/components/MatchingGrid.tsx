"use client";
import { MatchingCard } from "./MatchingCard";
import { Match } from "../types/matching";

interface MatchingGridProps {
  matches: Match[];
  onApprove: (advisorId: string) => Promise<void>;
  onReject: (advisorId: string) => Promise<void>;
}

export function MatchingGrid({ matches, onApprove, onReject }: MatchingGridProps) {
  // TODO: implement swipe animations with Framer Motion
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {matches.map((match) => (
        <MatchingCard
          key={match.advisorId}
          match={match}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}
