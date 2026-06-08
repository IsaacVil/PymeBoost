import { apiClient } from "@/lib/apiClient";
import { Contract } from "../validators/contractValidator";

export const contractsService = {
  getContracts: (pymeId: string) =>
    apiClient.request<Contract[]>(`/contracts?pymeId=${pymeId}`, { method: "GET" }),

  getContract: (id: string) =>
    apiClient.request<Contract>(`/contracts/${id}`, { method: "GET" }),

  propose: (draft: Contract) =>
    apiClient.request<Contract>("/contracts", { method: "POST", body: draft }),

  accept: (id: string) =>
    apiClient.request<Contract>(`/contracts/${id}/accept`, { method: "PUT" }),

  reject: (id: string, reason: string) =>
    apiClient.request<Contract>(`/contracts/${id}/reject`, { method: "PUT", body: { reason } }),

  counterOffer: (id: string, terms: Partial<Contract>) =>
    apiClient.request<Contract>(`/contracts/${id}/counter`, { method: "PUT", body: terms }),
};
