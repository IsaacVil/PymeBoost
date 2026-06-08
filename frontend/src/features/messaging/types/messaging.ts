export interface Conversation {
  id: string;
  matchId: string;
  participants: { id: string; name: string; role: "SME" | "ADVISOR" }[];
  lastMessage: string;
  unreadCount: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: number;
  readAt?: number;
}
