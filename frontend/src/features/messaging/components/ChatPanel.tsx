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
    <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-lg">
      <div className="p-4 border-b border-slate-800">
        <p className="font-semibold text-slate-100">{advisorName}</p>
        <p className="text-xs text-slate-400">{isConnected ? "Connected" : "Connecting…"}</p>
      </div>
      <MessageList messages={messages as any} currentUserId={currentUserId} />
      <MessageInput onSend={send} disabled={!isConnected} />
    </div>
  );
}
