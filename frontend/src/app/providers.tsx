"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/queryClient";

/**
 * App-wide client providers. Wraps the tree in the singleton TanStack
 * QueryClient (src/lib/queryClient.ts) so every feature shares one cache.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
