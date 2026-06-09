"use client";
import { useState } from "react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  // TODO: add Enter key submit, blocked keywords validation
  return (
    <div className="p-4 border-t border-slate-800 flex gap-3">
      <Input
        placeholder="Write a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="flex-1"
      />
      <Button size="sm" onClick={handleSend} disabled={disabled || !value.trim()}>
        Send
      </Button>
    </div>
  );
}
