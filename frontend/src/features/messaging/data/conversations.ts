// Mock chat conversations (Fase 2A) — ported/condensed from prototype/app/app.jsx.
import { AdvisorAccent } from "@/features/matching/data/advisors";
import { Contract, standardContract } from "@/features/contracts/data/contractModel";

export type MessageSender = "me" | "them" | "system";
export type MessageKind = "blocked" | "married" | "advisor-decision" | "proposal";

export interface Message {
  from: MessageSender;
  text?: string;
  kind?: MessageKind;
  contract?: Contract;
  decided?: "accepted" | "rejected";
  decision?: "accepted" | "rejected";
  t: string;
}

export interface Conversation {
  id: string;
  advisor: { name: string; monogram: string; role: string; accent: AdvisorAccent };
  status: string;
  married: boolean;
  contract: Contract | null;
  messages: Message[];
}

const activeContract: Contract = {
  ...standardContract(150000),
  durationMonths: 3,
  commissionPct: 5,
  start: "2026-04-10",
  deadline: "2026-07-10",
  objective: "Optimizar el proceso de marketing digital y aumentar las ventas de anuncios pagados en un 25%.",
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "m_ana",
    advisor: { name: "Mariana Solís", monogram: "MS", role: "Marketing Digital & Performance Ads", accent: "primary" },
    status: "Nuevo match",
    married: false,
    contract: null,
    messages: [
      { from: "them", text: "¡Hola! Vi el contexto de Hilo & Aguja. Tu reto de conversión en Meta es justo lo que más trabajo.", t: "10:02" },
      { from: "them", text: "¿Las campañas actuales separan público nuevo de recurrente, o van todas juntas?", t: "10:03" },
    ],
  },
  {
    id: "m_sofia",
    advisor: { name: "Sofía Ramírez", monogram: "SR", role: "Branding & Estrategia de Contenido", accent: "secondary" },
    status: "Propuesta aceptada",
    married: false,
    contract: { ...standardContract(135000), durationMonths: 2, budget: 900000, retainer: 135000, advisorResultPct: 7 },
    messages: [
      { from: "them", text: "Hola, soy Sofía. Vi el perfil de Hilo & Aguja y tengo experiencia exacta en marcas de moda.", t: "14:30" },
      { from: "me", text: "Perfecto, me interesa ver los números.", t: "14:45" },
      { from: "them", text: "Preparé una propuesta de contrato para que la revises.", t: "14:50" },
      { from: "them", kind: "proposal", contract: { ...standardContract(135000), durationMonths: 2, budget: 900000, retainer: 135000, advisorResultPct: 7 }, decided: "accepted", t: "14:51" },
      { from: "system", kind: "advisor-decision", decision: "accepted", t: "14:52" },
    ],
  },
  {
    id: "m_diego",
    advisor: { name: "Diego Hernández", monogram: "DH", role: "E-commerce & Optimización de Conversión", accent: "success" },
    status: "Contrato activo",
    married: true,
    contract: activeContract,
    messages: [
      { from: "them", text: "Hola, soy Diego. Revisé el reto de conversión y es justo mi especialidad.", t: "09:10" },
      { from: "me", text: "Dale, hagámoslo.", t: "09:28" },
      { from: "system", kind: "married", contract: activeContract, t: "09:30" },
    ],
  },
];
