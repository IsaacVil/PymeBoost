"use client";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useMessaging } from "../hooks/useMessaging";

interface ChatPanelProps {
  matchId: string;
  advisorName: string;
  currentUserId: string;
}

export function ChatPanel({ matchId, advisorName, currentUserId }: ChatPanelProps) {
  const { messages, isConnected, send } = useMessaging(matchId);

  // TODO: implement connection status indicator
  return (
    <div className="flex-1 flex flex-col bg-zinc-50 border-2 border-zinc-800 rounded-lg">
      <div className="p-4 border-b-2 border-zinc-800">
        <p className="font-semibold text-zinc-900">{advisorName}</p>
        <p className="text-xs text-zinc-500">{isConnected ? "Connected" : "Connecting…"}</p>
      </div>
      <MessageList messages={messages as any} currentUserId={currentUserId} />
      <MessageInput onSend={send} disabled={!isConnected} />
    </div>
  );
}
