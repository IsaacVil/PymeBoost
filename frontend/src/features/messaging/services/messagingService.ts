import { apiClient } from "@/lib/apiClient";
import { Message } from "../hooks/useMessaging";

export const messagingService = {
  getMessages: (matchId: string) =>
    apiClient.request<Message[]>(`/messages?matchId=${matchId}`, { method: "GET" }),

  sendMessage: (matchId: string, content: string) =>
    apiClient.request<Message>("/messages", { method: "POST", body: { matchId, content } }),

  markAsRead: (matchId: string) =>
    apiClient.request<void>(`/messages/${matchId}/read`, { method: "PUT" }),
};
