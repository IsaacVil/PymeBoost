"use client";
// Chat thread + contract negotiation, wired to the real backend (Fase 2B).
// Messages, proposals, accept/reject and Marry the Prospect all persist server-side;
// the advisor on the other side sees the same state (no simulated replies).
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";

import { AdvisorAccent } from "@/features/matching/data/advisors";
import { matchingService } from "@/features/matching/services/matchingService";
import { Contract, commissionForMonths } from "@/features/contracts/data/contractModel";
import { crc } from "@/lib/format";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { useNotificationStore } from "@/store/notificationStore";
import { Conversation } from "../data/conversations";
import { ContractDTO, MessageDTO, messagingService, toUiContract } from "../services/messagingService";
import { MarryModal } from "./MarryModal";
import { NegotiateContract } from "./NegotiateContract";

type Role = "pyme" | "advisor";

interface Counterpart {
  name: string;
  monogram: string;
  role: string;
  accent: AdvisorAccent;
}

interface ChatViewProps {
  matchId: string;
  role: Role;
  counterpart: Counterpart;
  married: boolean;
}

const fmt = (iso: string) =>
  iso ? new Date(iso).toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" }) : "";

export function ChatView({ matchId, role, counterpart, married }: ChatViewProps) {
  const qc = useQueryClient();
  const { publish: notify } = useNotificationStore();
  const [text, setText] = useState("");
  const [showContract, setShowContract] = useState(false);
  const [viewProposal, setViewProposal] = useState<Contract | null>(null);
  const [showMarry, setShowMarry] = useState(false);
  const [confirmUnmatch, setConfirmUnmatch] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Poll so the other party's messages, proposals and accept/marry state appear
  // without a manual reload.
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", matchId],
    queryFn: () => messagingService.getMessages(matchId),
    refetchInterval: 4000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  const { data: contract } = useQuery({
    queryKey: ["contract", matchId],
    queryFn: () => messagingService.getContract(matchId),
    refetchInterval: 4000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const refetchAll = () => {
    qc.invalidateQueries({ queryKey: ["messages", matchId] });
    qc.invalidateQueries({ queryKey: ["contract", matchId] });
    qc.invalidateQueries({ queryKey: ["conversations"] });
    qc.invalidateQueries({ queryKey: ["dashboard-tracking"] });
  };

  const sendMutation = useMutation({
    mutationFn: (content: string) => messagingService.sendMessage(matchId, content),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages", matchId] }),
    onError: (e: Error) => notify({ type: "error", title: "No se envió el mensaje", message: e.message, duration: 4000 }),
  });

  const proposeMutation = useMutation({
    mutationFn: (c: Contract) => messagingService.propose(matchId, c),
    onSuccess: () => { setShowContract(false); refetchAll(); notify({ type: "success", title: "Propuesta de contrato enviada", message: "📄", duration: 3000 }); },
    onError: (e: Error) => notify({ type: "error", title: "No se envió la propuesta", message: e.message, duration: 4000 }),
  });

  const decideMutation = useMutation({
    mutationFn: (decision: "accept" | "reject") =>
      decision === "accept" ? messagingService.accept(matchId) : messagingService.reject(matchId),
    onSuccess: (_d, decision) => { refetchAll(); notify(decision === "accept" ? { type: "success", title: "Propuesta aceptada", message: "✓", duration: 3000 } : { type: "error", title: "Propuesta rechazada", message: "✕", duration: 3000 }); },
    onError: (e: Error) => notify({ type: "error", title: "No se pudo procesar", message: e.message, duration: 4000 }),
  });

  const activateMutation = useMutation({
    mutationFn: () => messagingService.activate(matchId),
    onSuccess: () => { setShowMarry(false); refetchAll(); notify({ type: "success", title: `¡Contrato activo con ${counterpart.name.split(" ")[0]}! 💍`, message: "", duration: 3500 }); },
    onError: (e: Error) => notify({ type: "error", title: "No se pudo activar", message: e.message, duration: 4000 }),
  });

  const unmatchMutation = useMutation({
    mutationFn: () => matchingService.unmatch(matchId),
    onSuccess: () => { setConfirmUnmatch(false); qc.invalidateQueries({ queryKey: ["conversations"] }); notify({ type: "success", title: `Match con ${counterpart.name.split(" ")[0]} eliminado`, message: "", duration: 3000 }); },
    onError: (e: Error) => notify({ type: "error", title: "No se pudo deshacer el match", message: e.message, duration: 4000 }),
  });

  const send = () => {
    const t = text.trim();
    if (!t) return;
    sendMutation.mutate(t);
    setText("");
  };

  const uiContract = contract ? toUiContract(contract) : null;
  const busy = proposeMutation.isPending || decideMutation.isPending || activateMutation.isPending;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--surface)" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: "var(--bd) solid var(--ink)", background: "var(--paper)" }}>
        <Avatar text={counterpart.monogram} accent={counterpart.accent} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h4 style={{ fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{counterpart.name}</h4>
            <StatusBadge married={married} contract={contract ?? null} />
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{counterpart.role}</div>
        </div>
        {!married && (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Button variant="secondary" size="sm" onClick={() => setShowContract(true)} disabled={busy}>📄 Negociar</Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmUnmatch(true)} disabled={busy}>✕ Unmatch</Button>
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
        {messages.map((m) => (
          <MessageItem key={m.id} m={m} mine={m.sender === role} />
        ))}
      </div>

      {/* current proposal card */}
      {uiContract && contract && !married && (
        <div style={{ padding: "10px 18px", borderTop: "1.5px dashed var(--ink-faint)", background: "color-mix(in srgb, var(--accent) 5%, var(--surface))", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 180 }}>
            <span style={{ fontSize: 16 }}>📄</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Propuesta actual · {ContractStatusLabel(contract.status)}</div>
              <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 1 }}>
                {crc(contract.budget)} · retainer {crc(contract.retainer)} · comisión {commissionForMonths(uiContract.durationMonths)}%
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setViewProposal(uiContract)}>Ver detalles</Button>
        </div>
      )}

      {/* action bar */}
      <ActionBar
        role={role}
        married={married}
        contract={contract ?? null}
        busy={busy}
        onNegotiate={() => setShowContract(true)}
        onAccept={() => decideMutation.mutate("accept")}
        onReject={() => decideMutation.mutate("reject")}
        onMarry={() => setShowMarry(true)}
      />

      {/* input / active footer */}
      {married ? (
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
          <Button size="sm" onClick={send} isLoading={sendMutation.isPending}>➤ Enviar</Button>
        </div>
      )}

      {/* modals */}
      {showContract && (
        <NegotiateContract
          match={modalMatch(matchId, counterpart, uiContract, married)}
          onClose={() => setShowContract(false)}
          onPropose={(c) => proposeMutation.mutate(c)}
        />
      )}
      {viewProposal && (
        <NegotiateContract
          match={modalMatch(matchId, counterpart, viewProposal, married)}
          readOnly
          onClose={() => setViewProposal(null)}
        />
      )}
      {showMarry && uiContract && (
        <MarryModal
          match={modalMatch(matchId, counterpart, uiContract, married)}
          contract={uiContract}
          onConfirm={() => activateMutation.mutate()}
          onClose={() => setShowMarry(false)}
        />
      )}

      {confirmUnmatch && (
        <div onClick={() => setConfirmUnmatch(false)} style={{ position: "fixed", inset: 0, background: "rgba(33,27,18,.45)", backdropFilter: "blur(2px)", display: "grid", placeItems: "center", zIndex: 140, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(380px,94vw)", background: "var(--surface)", border: "2px solid var(--ink)", borderRadius: "var(--r-xl)", boxShadow: "7px 8px 0 rgba(33,27,18,.4)", overflow: "hidden" }}>
            <div style={{ background: "var(--danger)", color: "#fff", padding: "18px 20px", textAlign: "center", borderBottom: "2px solid var(--ink)" }}>
              <div style={{ fontSize: 30 }}>✕</div>
              <h3 className="display" style={{ fontSize: 24, marginTop: 4 }}>Unmatch</h3>
              <p className="font-mono" style={{ fontSize: 11, opacity: 0.9, marginTop: 4 }}>Eliminar match con {counterpart.name.split(" ")[0]}</p>
            </div>
            <div style={{ padding: 22 }}>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.5 }}>
                Si no llegaron a un acuerdo podés eliminar este match. Esta acción <b style={{ color: "var(--ink)" }}>no se puede deshacer</b>.
              </p>
              <div style={{ display: "grid", gap: 9, marginTop: 18 }}>
                <Button variant="danger" onClick={() => unmatchMutation.mutate()} isLoading={unmatchMutation.isPending}>✕ Confirmar Unmatch</Button>
                <Button variant="ghost" onClick={() => setConfirmUnmatch(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Build the minimal Conversation shape the modals consume.
function modalMatch(matchId: string, cp: Counterpart, contract: Contract | null, married: boolean): Conversation {
  return { id: matchId, advisor: cp, status: "", married, contract, messages: [] };
}

function ContractStatusLabel(status: ContractDTO["status"]): string {
  return status === "negotiating" ? "en negociación" : status === "accepted" ? "aceptada" : status === "rejected" ? "rechazada" : "anulada";
}

function MessageItem({ m, mine }: { m: MessageDTO; mine: boolean }) {
  if (m.message_type === "system" || m.sender === "system") {
    return (
      <div style={{ alignSelf: "center", maxWidth: "88%", background: "var(--surface)", border: "1.5px solid var(--ink-faint)", borderRadius: "var(--r-md)", padding: "8px 14px", textAlign: "center" }}>
        <span className="font-mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>{m.content}</span>
      </div>
    );
  }
  return (
    <div style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "76%" }}>
      <div style={{
        background: mine ? "var(--accent)" : "var(--surface)", color: mine ? "#fff" : "var(--ink)",
        border: "var(--bd) solid var(--ink)", borderRadius: "var(--r-lg)",
        borderBottomRightRadius: mine ? 4 : "var(--r-lg)", borderBottomLeftRadius: mine ? "var(--r-lg)" : 4,
        padding: "9px 13px", fontSize: 13.5, lineHeight: 1.45, boxShadow: "var(--sh-pop)",
      }}>
        {m.content}
      </div>
      <div className="font-mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 3, textAlign: mine ? "right" : "left" }}>{fmt(m.created_at)}</div>
    </div>
  );
}

interface ActionBarProps {
  role: Role;
  married: boolean;
  contract: ContractDTO | null;
  busy: boolean;
  onNegotiate: () => void;
  onAccept: () => void;
  onReject: () => void;
  onMarry: () => void;
}

function ActionBar({ role, married, contract, busy, onNegotiate, onAccept, onReject, onMarry }: ActionBarProps) {
  if (married) return null;
  const wrap = (bg: string, children: ReactNode) => (
    <div style={{ padding: "12px 18px", borderTop: "var(--bd) solid var(--ink)", background: bg, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
  );
  const info = (title: string, sub: string) => (
    <div style={{ flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{title}</div>
      <div className="font-mono" style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{sub}</div>
    </div>
  );

  // No contract yet, or the last one was rejected → invite a (new) proposal.
  if (!contract || contract.status === "rejected") {
    return wrap("var(--surface)", <>
      {info(contract?.status === "rejected" ? "Propuesta rechazada" : "Aún no hay contrato", "Enviá una propuesta para formalizar la asesoría.")}
      <Button size="sm" onClick={onNegotiate} disabled={busy}>📄 {contract?.status === "rejected" ? "Nueva propuesta" : "Proponer contrato"}</Button>
    </>);
  }

  if (contract.status === "negotiating") {
    if (contract.proposed_by !== role) {
      return wrap("color-mix(in srgb, var(--accent) 6%, var(--surface))", <>
        {info("Propuesta de contrato recibida", "Revisá los términos y decidí.")}
        <Button size="sm" onClick={onAccept} disabled={busy}>✓ Aceptar</Button>
        <Button variant="secondary" size="sm" onClick={onNegotiate} disabled={busy}>Re-negociar</Button>
        <Button variant="danger" size="sm" onClick={onReject} disabled={busy}>✕ Rechazar</Button>
      </>);
    }
    return wrap("var(--surface)", <>
      {info("Esperando respuesta de la contraparte", "Tu propuesta fue enviada. Podés ajustarla mientras tanto.")}
      <Button variant="secondary" size="sm" onClick={onNegotiate} disabled={busy}>Re-negociar</Button>
    </>);
  }

  // accepted (by the counterpart) → PYME formalizes with Marry.
  if (contract.status === "accepted") {
    if (role === "pyme") {
      return wrap("color-mix(in srgb, var(--success) 8%, var(--surface))", <>
        {info("La propuesta fue aceptada", "Formalizá el contrato y activá el proyecto.")}
        <Button size="sm" onClick={onMarry} disabled={busy}>💍 Marry the Prospect</Button>
        <Button variant="secondary" size="sm" onClick={onNegotiate} disabled={busy}>Re-negociar</Button>
      </>);
    }
    return wrap("color-mix(in srgb, var(--success) 8%, var(--surface))",
      info("Propuesta aceptada", "La PYME va a formalizar el contrato (Marry the Prospect)."));
  }
  return null;
}

function StatusBadge({ married, contract }: { married: boolean; contract: ContractDTO | null }) {
  const label = married ? "● Activo" : contract?.status === "negotiating" ? "Negociando" : contract?.status === "accepted" ? "Aceptada" : contract?.status === "rejected" ? "Rechazada" : "Match";
  const [bg, fg] = married
    ? ["var(--success)", "#fff"]
    : contract?.status === "negotiating"
      ? ["color-mix(in srgb, var(--warning) 16%, #fff)", "var(--warning)"]
      : ["color-mix(in srgb, var(--accent) 14%, #fff)", "var(--accent-deep)"];
  return (
    <span className="font-mono" style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", borderRadius: 999, padding: "2px 9px", border: "1.5px solid var(--ink)", background: bg, color: fg }}>
      {label}
    </span>
  );
}
