"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { Contract, ContractValidator } from "../validators/contractValidator";
import { useNotificationStore } from "@/store/notificationStore";

export function useContracts(pymeId: string) {
  const qc = useQueryClient();
  const { publish: notify } = useNotificationStore();

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: queryKeys.contracts.list(pymeId),
    queryFn: async (): Promise<Contract[]> => {
      // TODO: call contractsService.getContracts(pymeId)
      return [];
    },
  });

  const propose = useMutation({
    mutationFn: async (draft: unknown) => {
      const result = ContractValidator.validate(draft);
      if (!result.valid) throw new Error(result.error);
      // TODO: call contractsService.propose(result.data)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.contracts.list(pymeId) });
      notify({ type: "success", title: "Contract proposed", message: "Waiting for advisor acceptance.", duration: 4000 });
    },
  });

  return { contracts, isLoading, propose: propose.mutate };
}
