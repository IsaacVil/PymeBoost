"use client";
import { MatchingCard } from "./MatchingCard";
import { Match } from "../types/matching";

interface MatchingGridProps {
  matches: Match[];
  onSelect: (advisorId: string, matchId: string) => void;
}

export function MatchingGrid({ matches, onSelect }: MatchingGridProps) {
  // TODO: implement swipe animations with Framer Motion
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {matches.map((match) => (
        <MatchingCard key={match.advisorId} match={match} onSelect={onSelect} />
      ))}
    </div>
  );
}
