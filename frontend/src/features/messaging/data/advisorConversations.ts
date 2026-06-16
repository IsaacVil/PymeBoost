// Advisor-side mock conversations (Fase 2A) — the counterpart shown is the PYME.
// One conversation carries a pending proposal FROM the PYME so the advisor can
// Accept / Re-negotiate / Reject (Journey 2, step 4).
import { Contract, standardContract } from "@/features/contracts/data/contractModel";
import { Conversation } from "./conversations";

const pymeProposal: Contract = {
  ...standardContract(160000),
  durationMonths: 3,
  budget: 1_200_000,
  retainer: 160000,
  advisorResultPct: 6,
  objective: "Aumentar las ventas provenientes de anuncios pagados en un 25%.",
};

export const ADVISOR_CONVERSATIONS: Conversation[] = [
  {
    id: "adv_hilo",
    advisor: { name: "Hilo & Aguja", monogram: "HA", role: "Retail / Moda", accent: "primary" },
    status: "Nuevo match",
    married: false,
    contract: null,
    messages: [
      { from: "them", text: "¡Hola! Buscamos mejorar la conversión de nuestras campañas de pauta digital. ¿Nos podrías ayudar?", t: "09:40" },
      { from: "them", text: "Las campañas actuales no separan público nuevo de recurrente.", t: "09:41" },
    ],
  },
  {
    id: "adv_verde",
    advisor: { name: "Verde Pilas", monogram: "VP", role: "Alimentos saludables", accent: "success" },
    status: "Negociando",
    married: false,
    contract: pymeProposal,
    messages: [
      { from: "them", text: "Hola, somos Verde Pilas. Necesitamos optimizar el embudo de suscripciones.", t: "10:00" },
      { from: "me", text: "Perfecto, encaja con mi experiencia en conversión. Veamos los números.", t: "10:12" },
      { from: "them", text: "Te preparamos una propuesta con el contrato estándar de PymeBoost. ¿La aceptás?", t: "10:20" },
      { from: "them", kind: "proposal", contract: pymeProposal, t: "10:21" },
    ],
  },
];
