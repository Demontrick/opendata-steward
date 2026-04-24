import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRecords,
  approveRecord,
  rejectRecord,
  reviewRecord,
} from "../api/record";

export function useRecords(status?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["records", status],
    queryFn: () => fetchRecords(status),
  });

  const baseConfig = {
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["records"] }),
  };

  const approveMutation = useMutation({
    mutationFn: approveRecord,
    ...baseConfig,
  });

  const rejectMutation = useMutation({
    mutationFn: rejectRecord,
    ...baseConfig,
  });

  const reviewMutation = useMutation({
    mutationFn: reviewRecord,
    ...baseConfig,
  });

  return {
    records: query.data ?? [],
    isLoading: query.isLoading,

    // ✅ FIX: use mutateAsync (NOT mutate)
    approve: approveMutation.mutateAsync,
    reject: rejectMutation.mutateAsync,
    review: reviewMutation.mutateAsync,

    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
    isReviewing: reviewMutation.isPending,
  };
}