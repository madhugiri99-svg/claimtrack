import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClaim, getClaims, getSummary, uploadDocument } from './client';
import type { ClaimFilters } from './types';

// Components use these hooks instead of calling fetch. TanStack Query
// handles caching, loading and error state, and retries.

export const queryKeys = {
  summary: ['summary'] as const,
  claims: (filters: ClaimFilters) => ['claims', filters] as const,
  claim: (id: string) => ['claim', id] as const,
};

export function useSummary() {
  return useQuery({ queryKey: queryKeys.summary, queryFn: getSummary });
}

export function useClaims(filters: ClaimFilters) {
  return useQuery({ queryKey: queryKeys.claims(filters), queryFn: () => getClaims(filters) });
}

export function useClaim(id: string) {
  return useQuery({ queryKey: queryKeys.claim(id), queryFn: () => getClaim(id) });
}

export function useUploadDocument(claimId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, file }: { documentId: string; file: File }) =>
      uploadDocument(claimId, documentId, file),
    onSuccess: () => {
      // The upload changes the claim, the list and the summary.
      client.invalidateQueries({ queryKey: queryKeys.claim(claimId) });
      client.invalidateQueries({ queryKey: ['claims'] });
      client.invalidateQueries({ queryKey: queryKeys.summary });
    },
  });
}
