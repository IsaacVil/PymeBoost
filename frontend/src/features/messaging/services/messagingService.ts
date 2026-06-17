// Messaging + contract negotiation, wired to the real backend (Fase 2B).
//   communication: conversation list, messages.
//   contract: propose / accept / reject / activate (Marry the Prospect).
import { Contract, commissionForMonths } from "@/features/contracts/data/contractModel";
import { apiClient } from "@/lib/apiClient";

export type AccountRole = "pyme" | "advisor";

export interface ConversationDTO {
  match_id: string;
  counterpart_name: string;
  counterpart_monogram: string;
  counterpart_role: string;
  accent: "primary" | "secondary" | "success" | "warning" | "danger";
  status: string;
  contract_status: string | null;
  married: boolean;
  last_message: string | null;
}

export interface MessageDTO {
  id: string;
  content: string;
  sender: "pyme" | "advisor" | "system";
  message_type: "user" | "system";
  created_at: string;
}

export interface ContractDTO {
  id: string;
  match_id: string;
  status: "negotiating" | "accepted" | "rejected" | "voided";
  proposed_by: AccountRole | null;
  budget: number;
  retainer: number;
  commission_pct: number;
  advisor_result_pct: number;
  start_date: string;
  end_date: string;
  objective: string;
}

function monthsBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  const m = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  return Math.max(m, 1);
}

/** Backend contract → the UI Contract model used by the negotiation modal/cards. */
export function toUiContract(c: ContractDTO): Contract {
  return {
    budget: c.budget,
    retainer: c.retainer,
    durationMonths: monthsBetween(c.start_date, c.end_date),
    commissionPct: c.commission_pct,
    advisorResultPct: c.advisor_result_pct,
    start: c.start_date,
    deadline: c.end_date,
    objective: c.objective,
    metrics: [],
    plan: [],
  };
}

/** UI Contract → the propose payload the backend expects. */
function toProposePayload(c: Contract) {
  return {
    budget: c.budget,
    retainer: c.retainer,
    commission_pct: commissionForMonths(c.durationMonths),
    advisor_result_pct: c.advisorResultPct,
    objective: c.objective,
    start_date: c.start,
    end_date: c.deadline,
  };
}

async function unwrap<T>(p: Promise<{ success: boolean; data: T | null; error: string | null }>): Promise<T> {
  const res = await p;
  if (!res.success || res.data === null) throw new Error(res.error ?? "Request failed");
  return res.data;
}

export const messagingService = {
  getConversations: () =>
    unwrap(apiClient.request<ConversationDTO[]>("/api/communication/conversations", { method: "GET" })),

  getMessages: (matchId: string) =>
    unwrap(apiClient.request<MessageDTO[]>(`/api/communication/chats/${matchId}/messages`, { method: "GET" })),

  sendMessage: (matchId: string, content: string) =>
    unwrap(apiClient.request<MessageDTO>(`/api/communication/chats/${matchId}/messages`, { method: "POST", body: { content } })),

  // --- contract negotiation ---
  async getContract(matchId: string): Promise<ContractDTO | null> {
    const res = await apiClient.request<ContractDTO>(`/api/contracts/match/${matchId}`, { method: "GET" });
    return res.success && res.data ? res.data : null; // 404 → no contract yet
  },

  propose: (matchId: string, contract: Contract) =>
    unwrap(apiClient.request<ContractDTO>(`/api/contracts/match/${matchId}/propose`, { method: "POST", body: toProposePayload(contract) })),

  accept: (matchId: string) =>
    unwrap(apiClient.request<ContractDTO>(`/api/contracts/match/${matchId}/accept`, { method: "POST" })),

  reject: (matchId: string) =>
    unwrap(apiClient.request<ContractDTO>(`/api/contracts/match/${matchId}/reject`, { method: "POST" })),

  activate: (matchId: string) =>
    unwrap(apiClient.request<ContractDTO>(`/api/contracts/match/${matchId}/activate`, { method: "POST" })),
};
