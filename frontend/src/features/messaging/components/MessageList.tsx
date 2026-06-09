"use client";
import { MessageBubble } from "./MessageBubble";
import { ChatMessage } from "../types/messaging";

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  // TODO: implement auto-scroll to bottom on new message
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.length === 0 && (
        <p className="text-zinc-400 text-sm text-center">Start of conversation</p>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUserId} />
      ))}
    </div>
  );
}
