// data.jsx — datos demo de PymeBoost
const { useState } = React;

// ───────────────────────── PYME demo (perspectiva empresa) ─────────────────────────
const PYME = {
  name: "Hilo & Aguja",
  tagline: "Boutique de ropa · San José, CR",
  industry: "Retail / Moda",
  size: "Pequeña · 7 empleados",
  membership: "PymeBoost Plus · $25/mes",
  verified: true,              // validada contra MEIC
  monogram: "HA",
  context:
    "Boutique de ropa con tienda física y catálogo en línea. Vendemos colecciones cápsula de autor. " +
    "Invertimos en campañas de Instagram y Facebook pero la conversión es baja y el costo por venta sube cada mes.",
  problem: "Baja conversión en campañas de pauta digital",
  objective: "Aumentar ventas de anuncios pagados en un 25%",
  goals: ["+25% conversiones de campañas", "−15% costo por adquisición", "+30% tráfico desde redes"],
};

// ───────────────────────── Advisor demo (perspectiva especialista) ─────────────────
const ADVISOR_ME = {
  name: "Mariana Solís",
  role: "Marketing Digital & Performance Ads",
  monogram: "MS",
  rating: 4.8, reviews: 32,
  years: 9,
  membership: "Advisor Pro · $15/mes",
  verified: true,
};

// ───────────────────────── Advisors recomendados (deck de matching) ────────────────
// split = reparto plan estándar 1 mes [advisor%, pymeboost%]
// Presupuesto base de referencia del plan estándar PymeBoost (₡)
const STANDARD_BUDGET = 1200000;
const STANDARD_COMMISSION_PCT = 3;   // plan estándar: 3% del presupuesto base

const ADVISORS = [
  {
    id: "a1", name: "Mariana Solís", monogram: "MS",
    role: "Marketing Digital & Performance Ads",
    industry: "Retail · E-commerce · Moda",
    tags: ["Meta Ads", "Embudos", "Retargeting"],
    rating: 4.8, reviews: 32, years: 9,
    compat: 5,
    process: "Optimización de pauta y embudo digital",
    aiObjective: "Subir la conversión de campañas pagadas de 2.1% a 3.4% (+25%) y reducir el CPA 15% en 4 meses, sin aumentar el presupuesto de pauta.",
    successMetric: { label: "Tasa de conversión de campañas", from: "2.1%", to: "3.4%", delta: "+25%" },
    advisorGain: { pct: 8, basis: "de las ventas adicionales generadas", est: 620000, months: 4 },
    similar: { name: "Aurora Denim", desc: "Reestructuró pauta en Meta y subió ventas online 34% en 6 semanas." },
    uplift: { metric: "Conversión de campañas", value: "+25%" },
    upliftBars: [["Conversión", 78], ["CPA", 64], ["Tráfico social", 71]],
    retainer: 150000, split: [70, 30],
    accent: "primary",
    blurb: "Especialista en performance para marcas de moda. Construyo embudos medibles, no solo anuncios bonitos.",
  },
  {
    id: "a2", name: "Diego Hernández", monogram: "DH",
    role: "E-commerce & Optimización de Conversión",
    industry: "Retail · Tiendas online",
    tags: ["CRO", "Checkout", "Landing"],
    rating: 4.6, reviews: 21, years: 7,
    compat: 4,
    process: "Optimización de conversión y checkout",
    aiObjective: "Bajar el costo por adquisición 18% (de ₡14k a ₡11.5k) y subir 12% el cierre de checkout en 4 meses, manteniendo el volumen de ventas.",
    successMetric: { label: "Costo por adquisición (CPA)", from: "₡14k", to: "₡11.5k", delta: "−18%" },
    advisorGain: { pct: 6, basis: "de la reducción de costos de adquisición", est: 480000, months: 4 },
    similar: { name: "ShopLina", desc: "Rediseñó el checkout y bajó el CPA un 18% manteniendo volumen." },
    uplift: { metric: "Costo por adquisición", value: "−18%" },
    upliftBars: [["Checkout", 70], ["Velocidad", 66], ["CPA", 58]],
    retainer: 130000, split: [65, 35],
    accent: "secondary",
    blurb: "Hago que cada visita cuente: pruebas A/B, checkout sin fricción y páginas que venden.",
  },
  {
    id: "a3", name: "Valeria Castro", monogram: "VC",
    role: "Automatización & CRM",
    industry: "Servicios · Retail · B2B",
    tags: ["CRM", "Email", "Automatización"],
    rating: 4.9, reviews: 44, years: 11,
    compat: 4,
    process: "Automatización de seguimiento y recompra",
    aiObjective: "Subir la retención de clientes de 41% a 49% (+19%) y recuperar 22% de carritos abandonados en 4 meses con automatización.",
    successMetric: { label: "Retención de clientes", from: "41%", to: "49%", delta: "+19%" },
    advisorGain: { pct: 8, basis: "de la recompra recuperada", est: 560000, months: 4 },
    similar: { name: "TechParts CR", desc: "Automatizó el seguimiento de leads y recuperó 22% de carritos." },
    uplift: { metric: "Retención de clientes", value: "+19%" },
    upliftBars: [["Automatización", 82], ["Retención", 73], ["Recompra", 60] ],
    retainer: 160000, split: [72, 28],
    accent: "success",
    blurb: "Convierto procesos manuales en flujos automáticos. Menos tareas repetidas, más clientes que vuelven.",
  },
  {
    id: "a4", name: "Andrés Mora", monogram: "AM",
    role: "Finanzas & Estrategia de Pricing",
    industry: "Retail · Alimentos · Moda",
    tags: ["Pricing", "Márgenes", "Costos"],
    rating: 4.5, reviews: 17, years: 12,
    compat: 3,
    process: "Reestructuración de pricing y márgenes",
    aiObjective: "Mejorar el margen bruto de 38% a 50% (+12 pts) reajustando precios y costos por línea de producto en 4 meses.",
    successMetric: { label: "Margen bruto", from: "38%", to: "50%", delta: "+12 pts" },
    advisorGain: { pct: 10, basis: "del margen adicional generado", est: 700000, months: 4 },
    similar: { name: "CaféRaíz", desc: "Reajustó precios por línea y mejoró el margen bruto 12 puntos." },
    uplift: { metric: "Margen bruto", value: "+12 pts" },
    upliftBars: [["Pricing", 68], ["Costos", 61], ["Margen", 64]],
    retainer: 140000, split: [68, 32],
    accent: "warning",
    blurb: "Reviso números aburridos para que tu negocio gane más por cada venta. Pricing con cabeza fría.",
  },
  {
    id: "a5", name: "Sofía Ramírez", monogram: "SR",
    role: "Branding & Estrategia de Contenido",
    industry: "Moda · Lifestyle · Retail",
    tags: ["Branding", "Contenido", "Social"],
    rating: 4.7, reviews: 28, years: 8,
    compat: 4,
    process: "Estrategia de marca y contenido orgánico",
    aiObjective: "Elevar la interacción orgánica de 1.8% a 2.7% (+48%) y duplicar el alcance orgánico mensual en 4 meses.",
    successMetric: { label: "Interacción orgánica", from: "1.8%", to: "2.7%", delta: "+48%" },
    advisorGain: { pct: 7, basis: "de las ventas adicionales generadas", est: 500000, months: 4 },
    similar: { name: "Muza Studio", desc: "Rediseñó la marca y duplicó el engagement orgánico en 3 meses." },
    uplift: { metric: "Interacción orgánica", value: "+48%" },
    upliftBars: [["Branding", 80], ["Contenido", 76], ["Alcance", 69]],
    retainer: 135000, split: [70, 30],
    accent: "secondary",
    blurb: "Le doy voz y dirección a tu marca para que la gente la recuerde — y la comparta.",
  },
];

// ───────────────────────── Oportunidades entrantes (perspectiva Advisor) ───────────
const OPPORTUNITIES = [
  {
    id: "o1", pyme: "Hilo & Aguja", monogram: "HA", industry: "Retail / Moda",
    need: "Aumentar ventas de pauta digital 25%", compat: 5, when: "Hace 2 h",
    budget: 1200000, status: "Nuevo match",
  },
  {
    id: "o2", pyme: "Verde Pilas", monogram: "VP", industry: "Alimentos saludables", 
    need: "Optimizar embudo de suscripciones", compat: 4, when: "Ayer",
    budget: 900000, status: "Negociando",
  },
  {
    id: "o3", pyme: "Nimbo Tech", monogram: "NT", industry: "SaaS B2B",
    need: "Reducir CPA en campañas de demos", compat: 4, when: "Hace 3 días",
    budget: 1600000, status: "Nuevo match",
  },
];

// ───────────────────────── Mensajes semilla por advisor ────────────────────────────
const SEED_MESSAGES = {
  a1: [
    { from: "them", text: "¡Hola! Vi el contexto de Hilo & Aguja. Tu reto de conversión en Meta es justo lo que más trabajo." , t:"10:02" },
    { from: "them", text: "¿Las campañas actuales separan público nuevo de recurrente, o van todas juntas?", t:"10:03" },
  ],
};

// Contrato estándar de referencia (PymeBoost) ────────────────────────────────────────
function standardContract(advisor){
  return {
    budget: 1200000,                 // presupuesto implementación (₡)
    retainer: (advisor && advisor.retainer) || 150000,
    durationMonths: 1,               // gama estándar
    commissionPct: 3,                // 3% del presupuesto base
    advisorResultPct: 5,             // ganancia por resultados
    start: "2026-06-10",
    deadline: "2026-07-10",
    objective: "Aumentar las ventas provenientes de anuncios pagados en un 25%.",
    metrics: [
      { label: "Conversión de campañas", target: "+25%" },
      { label: "Costo por adquisición (CPA)", target: "−15%" },
      { label: "Tráfico desde redes", target: "+30%" },
    ],
    plan: [
      "Auditar campañas actuales y comportamiento de clientes.",
      "Re-segmentar anuncios según público objetivo.",
      "Rediseñar landing pages para mejorar conversión.",
      "Implementar estrategia de retargeting.",
      "Medir resultados semanalmente y ajustar según KPI's.",
    ],
  };
}

// Gamas de duración → comisión PymeBoost
const TIERS = [
  { months:1, pct:3, label:"Estándar" },
  { months:3, pct:5, label:"Media" },
  { months:6, pct:7, label:"Alta" },
];
function commissionForMonths(m){
  const t = TIERS.find(x=>x.months===m);
  if (t) return t.pct;
  return Math.min(3 + Math.max(0, m-1), 20); // personalizada: +1% por mes
}

const CRC = n => "₡" + Number(n).toLocaleString("es-CR");

// Reparto de precios del plan estándar PymeBoost para una tarjeta de advisor
function standardPricing(advisor){
  const budget = STANDARD_BUDGET;
  const commissionPct = STANDARD_COMMISSION_PCT;
  const commissionAmt = Math.round(budget * commissionPct / 100);
  return { budget, commissionPct, commissionAmt, retainer: advisor ? advisor.retainer : 380000 };
}

// ─── Dashboard demo data ─────────────────────────────────────────────────────
const DEMO_PHASES = [
  { id:"ph1", name:"Análisis Inicial", status:"completed",
    objectives:[
      { label:"Auditoría de campañas actuales", done:true },
      { label:"Identificación de público objetivo", done:true },
      { label:"Análisis de métricas históricas", done:true },
    ],
    report:{ submitted:true,
      description:"Se detectó mala segmentación en campañas y baja optimización de conversiones. Las campañas no diferenciaban entre audiencias nuevas y recurrentes, y el píxel de Meta no estaba instalado correctamente.",
      results:"Baseline establecido: conversión 2.1%, CPA ₡14k. Píxel de Meta reinstalado y verificado.",
      observations:"La cuenta de Meta tenía tres versiones distintas del píxel activas simultáneamente. Se unificaron antes de continuar.",
      submittedAt:"28 Abr 2026" } },
  { id:"ph2", name:"Optimización de Campañas", status:"completed",
    objectives:[
      { label:"Nueva segmentación implementada", done:true },
      { label:"Rediseño de anuncios", done:true },
      { label:"Configuración de retargeting", done:true },
    ],
    report:{ submitted:true,
      description:"Se crearon tres conjuntos de anuncios diferenciados: audiencias frías, lookalike y retargeting de visitantes de los últimos 30 días. Los creativos se rediseñaron con énfasis en producto y precio.",
      results:"Conversión de campañas: 2.1% → 3.4%. CPA: ₡14k → ₡10k. Tráfico desde redes sociales: +28%.",
      observations:"Se recomienda mantener el retargeting activo durante la fase 3 para no perder el momentum generado.",
      submittedAt:"22 May 2026" } },
  { id:"ph3", name:"Optimización de Landing Pages", status:"active",
    objectives:[
      { label:"Mejorar velocidad del sitio", done:false },
      { label:"Optimizar formularios de compra", done:false },
      { label:"Simplificar proceso de checkout", done:false },
    ],
    report:null },
];

const DEMO_KPIS = [
  { label:"Conversiones de campañas",        before:"2.1%",  after:"+3.4%", positive:true  },
  { label:"Costo por adquisición (CPA)",      before:"₡14k",  after:"₡10k",  positive:true  },
  { label:"Tráfico desde redes sociales",     before:"—",     after:"+28%",  positive:true  },
  { label:"Ventas digitales mensuales",       before:"—",     after:"+16%",  positive:true  },
];

const DEMO_DELIVERABLES = [
  { label:"Reporte de auditoría inicial",        done:true  },
  { label:"Reporte de campañas optimizadas",     done:true  },
  { label:"Reporte de segmentación de clientes", done:true  },
  { label:"Reporte final de resultados",         done:false },
  { label:"Análisis de ROI del proyecto",        done:false },
];

const DEMO_PHASES_VERDE = [
  { id:"vp1", name:"Auditoría del Embudo", status:"completed",
    objectives:[
      { label:"Análisis del proceso de suscripción", done:true },
      { label:"Identificar puntos de abandono", done:true },
      { label:"Revisar métricas de retención", done:true },
    ],
    report:{ submitted:true,
      description:"Se identificaron tres puntos críticos de abandono en el embudo de suscripción. El paso 2 del checkout (ingreso de datos de pago) acumula el 68% del abandono total.",
      results:"Tasa de conversión de suscripciones: 4.2%. Abandono en checkout: 68%. Tiempo promedio de compra: 4m 20s.",
      observations:"El formulario de pago solicita demasiados campos innecesarios. Se puede reducir a 4 campos mínimos.",
      submittedAt:"15 May 2026" } },
  { id:"vp2", name:"Optimización del Embudo", status:"active",
    objectives:[
      { label:"Simplificar proceso de suscripción", done:false },
      { label:"Implementar pago en menos pasos", done:false },
      { label:"A/B test en página de precios", done:false },
    ],
    report:null },
];

const DEMO_KPIS_VERDE = [
  { label:"Tasa de conversión de suscripciones", before:"4.2%", after:"—", positive:true  },
  { label:"Abandono en checkout",                before:"68%",  after:"—", positive:false },
];

const DEMO_DELIVERABLES_VERDE = [
  { label:"Auditoría del embudo de suscripción",    done:true  },
  { label:"Reporte de optimización del checkout",   done:false },
  { label:"Análisis final de retención",            done:false },
];

const DEMO_SALES_BASELINE = {
  items: [
    { label:"Ventas digitales mensuales (antes)",         value:"₡1,800,000" },
    { label:"Ventas proyectadas post-proceso",            value:"₡2,250,000", delta:"+25%",  positive:true },
    { label:"Ganancia estimada del advisor (4 meses)",    value:"₡90,000",    delta:"5%",    positive:true },
  ],
  note:"Ganancia del advisor = 5% del incremento mensual verificado × 4 meses: (₡450,000 × 5%) × 4."
};

const DEMO_PHASES_DONE = [
  { id:"d1", name:"Auditoría de Conversión", status:"completed",
    objectives:[
      {label:"Análisis del checkout actual", done:true},
      {label:"Identificar puntos de abandono", done:true},
      {label:"Testing de velocidad del sitio", done:true},
    ],
    report:{submitted:true, description:"Se identificaron 4 puntos críticos de abandono en el flujo de compra. La velocidad del sitio mejoró de 6.4s a 2.1s tras optimización de imágenes y scripts.", results:"CPA bajó de ₡14k a ₡9.8k. Tasa de checkout completado: 32% → 47%.", observations:"El mayor impacto fue la reducción del proceso de pago de 5 pasos a 2.", submittedAt:"10 Feb 2026"}
  },
  { id:"d2", name:"Optimización de Checkout", status:"completed",
    objectives:[
      {label:"Rediseño del proceso de pago", done:true},
      {label:"Implementar checkout en 2 pasos", done:true},
      {label:"A/B testing en páginas de producto", done:true},
    ],
    report:{submitted:true, description:"Checkout rediseñado de 5 a 2 pasos. El A/B test sobre 3,200 sesiones mostró +34% en conversión para la variante simplificada.", results:"Conversión de checkout: 32% → 47%. Tiempo promedio de compra: 4min → 1.5min.", observations:"Recomendado continuar pruebas en versión móvil para maximizar el impacto.", submittedAt:"28 Feb 2026"}
  },
  { id:"d3", name:"Análisis Final y Resultados", status:"completed",
    objectives:[
      {label:"Medición de KPIs finales", done:true},
      {label:"Reporte final de resultados", done:true},
      {label:"Recomendaciones futuras", done:true},
    ],
    report:{submitted:true, description:"Proyecto completado satisfactoriamente. Todos los KPIs principales superaron las metas acordadas en el contrato.", results:"ROI del proyecto: 340%. CPA reducido 30%. Conversión mejorada +15 puntos porcentuales.", observations:"Se recomienda monitoreo mensual para sostener los resultados obtenidos.", submittedAt:"28 Mar 2026"}
  },
];
const DEMO_KPIS_DONE = [
  { label:"Tasa de checkout completado", before:"32%",  after:"47%",  positive:true },
  { label:"Costo por adquisición",       before:"₡14k", after:"₡9.8k",positive:true },
  { label:"Velocidad del sitio",         before:"6.4s", after:"2.1s", positive:true },
  { label:"Conversión digital",          before:"1.9%", after:"3.2%", positive:true },
];
const DEMO_DELIVERABLES_DONE = [
  { label:"Reporte de auditoría de conversión",    done:true },
  { label:"Reporte de optimización de checkout",   done:true },
  { label:"A/B testing documentado",               done:true },
  { label:"Reporte final de resultados",           done:true },
  { label:"Análisis de ROI del proyecto",          done:true },
];
const DEMO_SALES_BASELINE_DONE = {
  items: [
    { label:"Ventas digitales mensuales (antes)",      value:"₡1,400,000" },
    { label:"Ventas digitales (después)",              value:"₡2,016,000",  delta:"+44%", positive:true },
    { label:"Ganancia real del advisor (4 meses)",     value:"₡ 246,400",   delta:"8%",   positive:true },
  ],
  note:"Ganancia del advisor = 8% del incremento mensual (₡616,000) × 4 meses."
};

function enrichContract(c, opts) {
  const o = opts || {};
  return {
    ...c,
    contractStatus: o.contractStatus || "active",
    phases:         o.phases         || DEMO_PHASES,
    kpis:           o.kpis           || DEMO_KPIS,
    deliverables:   o.deliverables   || DEMO_DELIVERABLES,
    salesBaseline:  o.salesBaseline  || DEMO_SALES_BASELINE,
  };
}

Object.assign(window, {
  PYME, ADVISOR_ME, ADVISORS, OPPORTUNITIES, SEED_MESSAGES,
  standardContract, TIERS, commissionForMonths, CRC,
  STANDARD_BUDGET, STANDARD_COMMISSION_PCT, standardPricing,
  DEMO_PHASES, DEMO_KPIS, DEMO_DELIVERABLES,
  DEMO_PHASES_VERDE, DEMO_KPIS_VERDE, DEMO_DELIVERABLES_VERDE,
  DEMO_SALES_BASELINE, DEMO_PHASES_DONE, DEMO_KPIS_DONE,
  DEMO_DELIVERABLES_DONE, DEMO_SALES_BASELINE_DONE,
  enrichContract,
});
