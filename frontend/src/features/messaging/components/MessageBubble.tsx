"use client";
import { ChatMessage } from "../types/messaging";
import { formatRelativeTime } from "@/shared/utils/helpers";

interface MessageBubbleProps {
  message: ChatMessage;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  // TODO: implement message bubble with alignment (own = right, other = left)
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
        isOwn ? "bg-teal-500 text-white" : "bg-zinc-100 text-zinc-900"
      }`}>
        <p>{message.content}</p>
        <p className="text-xs opacity-60 mt-1">{formatRelativeTime(message.timestamp)}</p>
      </div>
    </div>
  );
}
