"use client";
import { Input } from "@/shared/components/ui/Input";
import { MatchRequest } from "../types/matching";

interface MatchingFiltersProps {
  filters: Partial<MatchRequest>;
  onChange: (filters: Partial<MatchRequest>) => void;
}

export function MatchingFilters({ filters, onChange }: MatchingFiltersProps) {
  // TODO: implement filter controls (industry, budget range, timeline)
  return (
    <div className="flex gap-4">
      <Input
        label="Industry"
        placeholder="e.g. Retail, Technology"
        value={filters.industry ?? ""}
        onChange={(e) => onChange({ ...filters, industry: e.target.value })}
      />
    </div>
  );
}
