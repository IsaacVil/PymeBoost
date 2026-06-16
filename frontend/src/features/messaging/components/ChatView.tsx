"use client";
// Chat thread with contract negotiation — ported from prototype/app/messaging.jsx.
import { useEffect, useRef, useState } from "react";

import { Contract, standardContract } from "@/features/contracts/data/contractModel";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { useNotificationStore } from "@/store/notificationStore";
import { Conversation, Message } from "../data/conversations";
import { MarryModal } from "./MarryModal";
import { MessageBubble } from "./MessageBubble";
import { NegotiateContract } from "./NegotiateContract";

type Role = "pyme" | "advisor";
type Updater = (m: Conversation) => Conversation;

const CONTACT_PATTERNS: { re: RegExp; what: string }[] = [
  { re: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, what: "un correo electrónico" },
  { re: /(?:\+?\d[\s-]?){8,}/, what: "un número telefónico" },
  { re: /(?:wa\.me|whats\s?app|telegram|t\.me|instagram|insta\b|@[a-z0-9_.]{3,}|facebook|tiktok)/i, what: "una red social o contacto externo" },
  { re: /https?:\/\/|www\./i, what: "un enlace externo" },
];
function scanContact(text: string): string | null {
  for (const p of CONTACT_PATTERNS) if (p.re.test(text)) return p.what;
  return null;
}
const now = () => new Date().toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" });
const REPLIES = [
  "Perfecto, lo tomo en cuenta. ¿Querés que armemos el plan por fases en el contrato?",
  "De acuerdo. Puedo arrancar la auditoría esta semana si formalizamos.",
  "Buenísimo. Mi enfoque sería separar público nuevo de recurrente desde el día uno.",
  "Eso encaja con lo que vi antes. Podemos fijar la conversión como meta principal.",
];

interface ChatViewProps {
  match: Conversation;
  role: Role;
  onUpdate: (updater: Updater) => void;
  onUnmatch: (id: string) => void;
}

export function ChatView({ match, role, onUpdate, onUnmatch }: ChatViewProps) {
  const { publish: notify } = useNotificationStore();
  const [text, setText] = useState("");
  const [showContract, setShowContract] = useState(false);
  const [marry, setMarry] = useState<Contract | null>(null);
  const [confirmUnmatch, setConfirmUnmatch] = useState(false);
  const [viewProposal, setViewProposal] = useState<Contract | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [match.messages, match.id]);

  const push = (msg: Message) => onUpdate((m) => ({ ...m, messages: [...m.messages, msg] }));

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const bad = scanContact(t);
    if (bad) {
      push({ from: "system", kind: "blocked", text: `Mensaje bloqueado: parece contener ${bad}. Toda la comunicación debe ocurrir dentro de PymeBoost.`, t: now() });
      setText("");
      notify({ type: "error", title: "Contacto externo bloqueado", message: "🚫", duration: 3000 });
      return;
    }
    push({ from: "me", text: t, t: now() });
    setText("");
    if (role === "pyme") {
      setTimeout(() => onUpdate((m) => ({ ...m, messages: [...m.messages, { from: "them", text: REPLIES[Math.floor(Math.random() * REPLIES.length)], t: now() }] })), 900);
    }
  };

  const propose = (c: Contract) => {
    onUpdate((m) => ({ ...m, contract: c, status: "Negociando", messages: [...m.messages, { from: "me", kind: "proposal", contract: c, t: now() }] }));
    setShowContract(false);
    notify({ type: "success", title: "Propuesta de contrato enviada", message: "📄", duration: 3000 });
    if (role === "pyme") {
      setTimeout(() => onUpdate((m) => ({
        ...m, status: "Propuesta aceptada",
        messages: [...m.messages,
          { from: "them", text: "Revisé la propuesta. Los términos me cierran bien. La acepto.", t: now() },
          { from: "system", kind: "advisor-decision", decision: "accepted", t: now() },
        ],
      })), 1500);
    }
  };

  const confirmMarry = () => {
    const c = marry!;
    onUpdate((m) => ({ ...m, contract: c, status: "Contrato activo", married: true, messages: [...m.messages, { from: "system", kind: "married", contract: c, t: now() }] }));
    setMarry(null);
    notify({ type: "success", title: `¡Contrato activo con ${match.advisor.name.split(" ")[0]}! 💍`, message: "", duration: 3000 });
  };

  const showNegotiate = !match.married;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: "var(--bd) solid var(--ink)", background: "var(--paper)" }}>
        <Avatar text={match.advisor.monogram} accent={match.advisor.accent} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h4 style={{ fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.advisor.name}</h4>
            <StatusBadge married={match.married} status={match.status} />
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.advisor.role}</div>
        </div>
        {showNegotiate && (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Button variant="secondary" size="sm" onClick={() => setShowContract(true)}>📄 Negotiate</Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmUnmatch(true)}>✕ Unmatch</Button>
          </div>
        )}
      </div>

      {/* protected banner */}
      <div style={{ padding: "8px 18px", borderBottom: "1.5px dashed var(--ink-faint)", background: "color-mix(in srgb, var(--accent) 7%, #fff)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13 }}>🔒</span>
        <span className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)" }}>
          Chat protegido — no se permite compartir correos, teléfonos ni redes. PymeBoost los bloquea automáticamente.
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 10, background: "var(--paper)" }}>
        {match.messages.map((m, i) => (
          <MessageBubble key={i} m={m} mine={m.from === "me"} onViewDetails={(c) => setViewProposal(c)} />
        ))}
      </div>

      {/* Marry CTA (PYME, after advisor accepted) */}
      {!match.married && match.status === "Propuesta aceptada" && role === "pyme" && (
        <div style={{ padding: "12px 18px", borderTop: "var(--bd) solid var(--ink)", background: "color-mix(in srgb, var(--success) 8%, var(--surface))", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>El advisor aceptó la propuesta</div>
            <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>Podés formalizar el contrato y activar el proyecto.</div>
          </div>
          <Button size="sm" onClick={() => setMarry(match.contract ?? standardContract())}>💍 Marry the Prospect</Button>
          <Button variant="secondary" size="sm" onClick={() => setShowContract(true)}>Re-negociar</Button>
        </div>
      )}

      {/* input / active footer */}
      {match.married ? (
        <div style={{ padding: "14px 18px", borderTop: "var(--bd) solid var(--ink)", textAlign: "center", background: "var(--paper)" }}>
          <span className="font-mono" style={{ fontSize: 12, color: "var(--ink-soft)" }}>Contrato activo · seguimiento disponible en el dashboard del proyecto.</span>
        </div>
      ) : (
        <div style={{ padding: "12px 16px", borderTop: "var(--bd) solid var(--ink)", display: "flex", gap: 10, alignItems: "center", background: "var(--surface)" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Escribí un mensaje…"
            style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500, flex: 1, borderRadius: 999, padding: "11px 16px", border: "var(--bd) solid var(--ink)", background: "var(--surface)", color: "var(--ink)", outline: "none" }}
          />
          <Button size="sm" onClick={send}>➤ Enviar</Button>
        </div>
      )}

      {/* modals */}
      {showContract && <NegotiateContract match={match} onClose={() => setShowContract(false)} onPropose={propose} />}
      {viewProposal && <NegotiateContract match={{ ...match, contract: viewProposal }} readOnly onClose={() => setViewProposal(null)} />}
      {marry && <MarryModal match={match} contract={marry} onConfirm={confirmMarry} onClose={() => setMarry(null)} />}

      {confirmUnmatch && (
        <div onClick={() => setConfirmUnmatch(false)} style={{ position: "fixed", inset: 0, background: "rgba(33,27,18,.45)", backdropFilter: "blur(2px)", display: "grid", placeItems: "center", zIndex: 140, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(380px,94vw)", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", overflow: "hidden" }}>
            <div style={{ background: "var(--danger)", color: "#fff", padding: "18px 20px", textAlign: "center", borderBottom: "2px solid var(--ink)" }}>
              <div style={{ fontSize: 30 }}>✕</div>
              <h3 className="display" style={{ fontSize: 24, marginTop: 4 }}>Unmatch</h3>
              <p className="font-mono" style={{ fontSize: 11, opacity: 0.9, marginTop: 4 }}>Eliminar match con {match.advisor.name.split(" ")[0]}</p>
            </div>
            <div style={{ padding: 22 }}>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.5 }}>
                Si no llegaron a un acuerdo podés eliminar este match. Esta acción <b style={{ color: "var(--ink)" }}>no se puede deshacer</b>.
              </p>
              <div style={{ display: "grid", gap: 9, marginTop: 18 }}>
                <Button variant="danger" onClick={() => { setConfirmUnmatch(false); onUnmatch(match.id); }}>✕ Confirmar Unmatch</Button>
                <Button variant="ghost" onClick={() => setConfirmUnmatch(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ married, status }: { married: boolean; status: string }) {
  const [bg, fg] = married
    ? ["var(--success)", "#fff"]
    : status === "Negociando"
      ? ["color-mix(in srgb, var(--warning) 16%, #fff)", "var(--warning)"]
      : ["color-mix(in srgb, var(--accent) 14%, #fff)", "var(--accent-deep)"];
  return (
    <span className="font-mono" style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", borderRadius: 999, padding: "2px 9px", border: "1.5px solid var(--ink)", background: bg, color: fg }}>
      {married ? "● Activo" : status}
    </span>
  );
}
