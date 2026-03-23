"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/types";
import { mockChatMessages } from "@/lib/mock-data";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatPanel({ className }: { className?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      userId: "u1",
      username: "sportsfan42",
      content: input,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className={cn("flex flex-col border border-border rounded-xl bg-card overflow-hidden", className)}>
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Live Chat</h3>
        <p className="text-xs text-muted">Game Day Thread</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {messages.map((msg) => {
          const isMe = msg.userId === "u1";
          return (
            <div key={msg.id} className={cn("flex gap-2", isMe && "flex-row-reverse")}>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-[10px] font-bold">
                {msg.username.slice(0, 2).toUpperCase()}
              </div>
              <div className={cn(
                "max-w-[75%] rounded-xl px-3 py-2",
                isMe ? "bg-accent/20 text-foreground" : "bg-card-hover text-foreground"
              )}>
                {!isMe && (
                  <p className="text-[10px] text-accent font-medium mb-0.5">@{msg.username}</p>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Send a message..."
            className="flex-1 rounded-lg bg-card-hover border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted outline-none focus:border-accent/50 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="rounded-lg bg-accent p-2 text-black hover:bg-accent-hover transition-colors disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
