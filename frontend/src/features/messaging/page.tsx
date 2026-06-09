"use client";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

const mockConversations = [
  { id: "m1", advisor: "Ana García", lastMessage: "I reviewed the process map, let's discuss.", time: "2m ago", unread: 2 },
  { id: "m2", advisor: "Luis Torres", lastMessage: "The proposal looks good to me.", time: "1h ago", unread: 0 },
];

export default function MessagingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-zinc-900">Messages</h1>

        <div className="flex gap-6 h-[calc(100vh-14rem)]">
          {/* Conversation list */}
          <aside className="w-72 space-y-2 overflow-y-auto">
            {mockConversations.map((c) => (
              <Card key={c.id} className="cursor-pointer hover:border-teal-500/50 transition-colors p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-zinc-900">{c.advisor}</p>
                  {c.unread > 0 && <Badge status="active" label={String(c.unread)} />}
                </div>
                <p className="text-sm text-zinc-500 truncate mt-1">{c.lastMessage}</p>
                <p className="text-xs text-zinc-400 mt-1">{c.time}</p>
              </Card>
            ))}
          </aside>

          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-zinc-50 border-2 border-zinc-800 rounded-lg">
            <div className="p-4 border-b-2 border-zinc-800">
              <p className="font-semibold text-zinc-900">Ana García</p>
              <p className="text-xs text-zinc-500">Process Optimization Advisor</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {/* TODO: render MessageList component */}
              <p className="text-zinc-400 text-sm text-center">Start of conversation</p>
            </div>
            <div className="p-4 border-t-2 border-zinc-800 flex gap-3">
              <Input placeholder="Write a message…" className="flex-1" />
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
