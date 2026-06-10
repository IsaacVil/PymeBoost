"use client";
import { useState, useEffect, useRef } from "react";
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
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = (typeof window !== "undefined" && (window as any).__ENV__?.NEXT_PUBLIC_WS_URL) ?? "ws://localhost:3001";
    const socket = new WebSocket(`${wsUrl}/messages/${matchId}`);

    socket.onopen = () => setIsConnected(true);

    socket.onmessage = (event) => {
      const msg: Message = JSON.parse(event.data);
      setMessages((prev: Message[]) => [...prev, msg]);
    };

    socket.onclose = () => setIsConnected(false);

    socket.onerror = () => {
      notify({ type: "error", title: "Chat disconnected", message: "Reconnecting…", duration: 3000 });
      setIsConnected(false);
    };

    ws.current = socket;
    return () => socket.close();
  }, [matchId]);

  const send = (content: string) => {
    if (!content.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    const msg: Message = { id: `msg-${Date.now()}`, senderId: "me", content, timestamp: Date.now() };
    setMessages((prev: Message[]) => [...prev, msg]);
    ws.current.send(JSON.stringify(msg));
  };

  return { messages, isConnected, send };
}
