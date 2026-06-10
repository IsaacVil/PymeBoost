"use client";
import { useState, useEffect } from "react";
import { Input } from "@/shared/components/ui/Input";
import { MatchRequest } from "../types/matching";

interface MatchingFiltersProps {
  filters: Partial<MatchRequest>;
  onChange: (filters: Partial<MatchRequest>) => void;
}

export function MatchingFilters({ filters, onChange }: MatchingFiltersProps) {
  const [industry, setIndustry] = useState(filters.industry ?? "");

  // Debounce: wait 300ms after the user stops typing before calling onChange
  // Prevents an API call on every keystroke in the industry search field
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ ...filters, industry });
    }, 300);
    return () => clearTimeout(timer);
  }, [industry]);

  return (
    <div className="flex gap-4">
      <Input
        label="Industry"
        placeholder="e.g. Retail, Technology"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
    </div>
  );
}
