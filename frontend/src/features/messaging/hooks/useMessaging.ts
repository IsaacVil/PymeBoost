"use client";
import { useState, useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
}

export function useMessaging(matchId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { publish: notify } = useNotificationStore();

  useEffect(() => {
    // TODO: Open WebSocket connection to backend for real-time chat
    setIsConnected(true);
    return () => setIsConnected(false);
  }, [matchId]);

  const send = async (content: string) => {
    if (!content.trim()) return;
    const msg: Message = { id: `msg-${Date.now()}`, senderId: "me", content, timestamp: Date.now() };
    setMessages((prev) => [...prev, msg]);
    // TODO: emit via WebSocket or POST to /messages
  };

  return { messages, isConnected, send };
}
