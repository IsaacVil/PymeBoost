// app.jsx — shell, selector de rol, navegación, vistas
const { useState: useA, useEffect: useAE, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardVariant": "Editorial",
  "brandFont": "Righteous",
  "accent": "#0EA5A0",
  "retro": "Equilibrado"
}/*EDITMODE-END*/;

const VARIANT_MAP = { "Clásica":"classic", "Data":"data", "Editorial":"editorial" };
const RETRO_MAP = { "Sutil":"subtle", "Equilibrado":"balanced", "Expresivo":"expressive" };

// fuentes de marca seleccionables (display)
const BRAND_FONTS = [
  { family:"Macondo",       fallback:"cursive",    note:"Manuscrita · actual" },
  { family:"Righteous",     fallback:"sans-serif", note:"Retro geométrica" },
  { family:"Bungee",        fallback:"sans-serif", note:"Rótulo en bloque" },
  { family:"Alfa Slab One", fallback:"serif",      note:"Slab pesada" },
  { family:"Rye",           fallback:"serif",      note:"Western vintage" },
  { family:"Pacifico",      fallback:"cursive",    note:"Script años 50" },
];

// ───────────────────────── Role landing ─────────────────────────
function RoleLanding({ onPick }){
  return (
    <div style={{ minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div style={{ textAlign:"center", maxWidth:760 }}>
        <Logo size={42} />
        <h1 className="display" style={{ fontSize:"clamp(36px,5.2vw,58px)", lineHeight:1.16, marginTop:22 }}>
          Conectá tu PYME con<br/><span style={{ color:"var(--accent)" }}>advisors de alto rendimiento</span>
        </h1>
        <p style={{ fontSize:16, color:"var(--ink-soft)", marginTop:24, maxWidth:540, marginInline:"auto", lineHeight:1.55 }}>
          Asesoría orientada a resultados, con matching inteligente, contratos transparentes y seguimiento real del impacto. Elegí cómo querés entrar.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginTop:34 }}>
          <RoleCard
            onClick={()=>onPick("pyme")}
            mono="HA" accent="primary" tag="Para empresas"
            title="Soy una PYME"
            desc="Descubrí advisors recomendados por IA, negociá el contrato y dale seguimiento a tu proyecto."
            price="$25 / mes" cta="Entrar como PYME"
          />
          <RoleCard
            onClick={()=>onPick("advisor")}
            mono="MS" accent="secondary" tag="Para especialistas"
            title="Soy un Advisor"
            desc="Recibí oportunidades generadas automáticamente, presentá propuestas y cerrá contratos por resultados."
            price="$15 / mes" cta="Entrar como Advisor"
          />
        </div>
        <p className="mono" style={{ fontSize:11, color:"var(--ink-faint)", marginTop:22 }}>
          PYMES verificadas con la lista oficial del MEIC · Advisors validados por IA desde LinkedIn
        </p>
      </div>
    </div>
  );
}
function RoleCard({ mono, accent, tag, title, desc, price, cta, onClick }){
  return (
    <button onClick={onClick} style={{
      textAlign:"left", background:"var(--surface)", border:"var(--bd) solid var(--ink)",
      borderRadius:"var(--r-xl)", boxShadow:"var(--sh-card)", padding:24, cursor:"pointer",
      transition:"transform .12s ease, box-shadow .12s ease", display:"flex", flexDirection:"column", gap:14,
    }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translate(-2px,-2px)"; e.currentTarget.style.boxShadow="6px 8px 0 rgba(33,27,18,.22)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="var(--sh-card)"; }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <Avatar text={mono} accent={accent} size={52} square />
        <Badge tone="neutral">{tag}</Badge>
      </div>
      <div>
        <h3 style={{ fontSize:23 }}>{title}</h3>
        <p style={{ fontSize:13.5, color:"var(--ink-soft)", marginTop:7, lineHeight:1.5 }}>{desc}</p>
      </div>
      <div style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:8 }}>
        <span className="mono" style={{ fontSize:12, fontWeight:700 }}>{price}</span>
        <span className="mono" style={{ fontSize:12, fontWeight:700, color:"var(--accent)" }}>{cta} →</span>
      </div>
    </button>
  );
}

// ───────────────────────── Sidebar ─────────────────────────
function Sidebar({ role, view, setView, matches, onSwitchRole }){
  const isP = role==="pyme";
  const nav = isP
    ? [["discover","◆","Descubrir"],["messages","✉","Mensajes"],["contracts","▣","Mi Contrato"]]
    : [["discover","◆","Oportunidades"],["messages","✉","Mensajes"],["contracts","▣","Contratos"]];
  const me = isP ? PYME : ADVISOR_ME;
  const newCount = matches.filter(m=>!m.married).length;
  const marriedCount = matches.filter(m=>m.married).length;
  return (
    <aside style={{ width:236, flex:"0 0 236px", borderRight:"var(--bd) solid var(--ink)", background:"var(--surface)", display:"flex", flexDirection:"column", padding:"18px 16px" }}>
      <Logo size={24} />
      <nav style={{ marginTop:26, display:"grid", gap:6 }}>
        {nav.map(([id,ic,label])=>(
          <button key={id} onClick={()=>setView(id)} style={navItem(view===id)}>
            <span style={{ fontSize:15, width:18, textAlign:"center" }}>{ic}</span>
            <span>{label}</span>
            {id==="messages" && newCount>0 && (
              <span className="mono" style={{ marginLeft:"auto", background:"var(--accent)", color:"#fff", borderRadius:999, border:"1.5px solid var(--ink)", fontSize:10, fontWeight:700, padding:"1px 7px" }}>{newCount}</span>
            )}
            {id==="contracts" && marriedCount>0 && (
              <span style={{ marginLeft:"auto", width:8, height:8, borderRadius:"50%", background:"var(--success)", border:"1.5px solid var(--ink)", flexShrink:0, display:"block" }} />
            )}
          </button>
        ))}
      </nav>

      <div style={{ marginTop:"auto", display:"grid", gap:12 }}>
        <div style={{ background:"var(--paper)", border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"11px 12px" }}>
          <div className="eyebrow" style={{ marginBottom:4 }}>{isP?"Membresía PYME":"Membresía Advisor"}</div>
          <div className="mono" style={{ fontSize:12, fontWeight:700 }}>{me.membership}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 2px" }}>
          <Avatar text={me.monogram} accent={isP?"primary":"secondary"} size={38} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13.5, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
              {me.name.split(" ")[0]} {me.verified && <span title="Verificado" style={{ color:"var(--success)" }}>✓</span>}
            </div>
            <div className="mono" style={{ fontSize:10.5, color:"var(--ink-soft)" }}>{isP?"PYME":"Advisor"}</div>
          </div>
        </div>
        <button onClick={onSwitchRole} className="mono" style={{ background:"none", border:"1.5px solid var(--ink-faint)", borderRadius:"var(--r-sm)", color:"var(--ink-soft)", fontSize:11, fontWeight:600, padding:"7px", cursor:"pointer" }}>⇄ Cambiar de rol</button>
      </div>
    </aside>
  );
}
const navItem = (on) => ({
  display:"flex", alignItems:"center", gap:11, padding:"9px 11px", borderRadius:"var(--r-md)",
  border:"var(--bd) solid " + (on?"var(--ink)":"transparent"),
  background: on ? "var(--accent)" : "transparent", color: on ? "#fff" : "var(--ink)",
  fontFamily:"'JetBrains Mono', monospace", fontWeight:600, fontSize:13, cursor:"pointer",
  boxShadow: on ? "var(--sh-pop)" : "none", textAlign:"left", width:"100%",
});

// ───────────────────────── PYME · Discover ─────────────────────────
function DiscoverPYME({ variant, onMatch }){
  const [deck, setDeck] = useA(ADVISORS);
  const onDecision = (dir, adv)=>{ if(dir==="right") onMatch(adv); };
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 312px", gap:24, padding:"24px 28px", height:"100%", overflow:"auto" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:6 }}>
        <div style={{ textAlign:"center", marginBottom:22, width:"100%" }}>
          <div className="eyebrow">Matching inteligente</div>
          <h2 className="display" style={{ fontSize:34, lineHeight:1.12, marginTop:6, whiteSpace:"nowrap" }}>Descubrí tu advisor</h2>
        </div>
        <SwipeDeck advisors={deck} variant={variant} onDecision={onDecision} />
      </div>

      <div style={{ display:"grid", gap:16, alignContent:"start" }}>
        <Panel pad={16}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <Avatar text={PYME.monogram} accent="primary" size={44} square />
            <div style={{ flex:1, minWidth:0 }}>
              <h4 style={{ fontSize:15, lineHeight:1.15 }}>{PYME.name}</h4>
              <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)", marginTop:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{PYME.tagline}</div>
            </div>
            <Badge tone="success" style={{ flexShrink:0 }}>✓ MEIC</Badge>
          </div>
          <div style={{ marginTop:13, borderTop:"1.5px dashed var(--ink-faint)", paddingTop:12 }}>
            <div className="eyebrow" style={{ marginBottom:5 }}>Problema a optimizar</div>
            <p style={{ fontSize:13, color:"var(--ink-soft)", lineHeight:1.45 }}>{PYME.problem}</p>
            <div className="eyebrow" style={{ margin:"11px 0 5px" }}>Objetivo</div>
            <p style={{ fontSize:13, fontWeight:600 }}>{PYME.objective}</p>
          </div>
        </Panel>

        <Panel pad={16}>
          <div className="eyebrow" style={{ marginBottom:9 }}>Cómo funciona el matching</div>
          <ol style={{ margin:0, paddingLeft:0, listStyle:"none", display:"grid", gap:9 }}>
            {[["♥","Swipe Approved abre un chat con el advisor."],["✉","Negociá tarifa y alcance en mensajes."],["📄","Negotiate Contract define el acuerdo."],["💍","Marry the Prospect activa el contrato."]].map(([ic,t],i)=>(
              <li key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:14, width:20, textAlign:"center", flex:"0 0 20px" }}>{ic}</span>
                <span style={{ fontSize:12.5, color:"var(--ink-soft)", lineHeight:1.4 }}>{t}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

// ───────────────────────── Advisor · Oportunidades ─────────────────────────
function OpportunitiesAdvisor({ matches, onOpen }){
  return (
    <div style={{ padding:"24px 28px", height:"100%", overflow:"auto" }}>
      <div style={{ marginBottom:18 }}>
        <div className="eyebrow">Generadas por PymeBoost</div>
        <h2 className="display" style={{ fontSize:32, lineHeight:1, marginTop:4 }}>Oportunidades para vos</h2>
        <p style={{ fontSize:13.5, color:"var(--ink-soft)", marginTop:6, maxWidth:560 }}>
          No buscás proyectos: el motor de IA te conecta con PYMES según tu experiencia. Abrí un chat para presentar tu propuesta.
        </p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
        {matches.map(m=>(
          <Panel key={m.id} pad={16} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:11 }}>
              <Avatar text={m.advisor.monogram} accent={m.advisor.accent} size={46} square />
              <div style={{ flex:1, minWidth:0 }}>
                <h4 style={{ fontSize:15.5 }}>{m.advisor.name}</h4>
                <div className="mono" style={{ fontSize:11, color:"var(--ink-soft)" }}>{m.advisor.role}</div>
              </div>
              <Badge tone={m.married?"success":m.status==="Negociando"?"warning":"accent"}>{m.married?"Activo":m.status}</Badge>
            </div>
            <div style={{ background:"var(--paper)", border:"1.5px solid var(--ink)", borderRadius:"var(--r-md)", padding:"10px 12px" }}>
              <div className="eyebrow" style={{ marginBottom:3 }}>Necesidad</div>
              <div style={{ fontSize:13, fontWeight:600 }}>{m.need}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <CompatDots value={m.compat} label="Match" />
              <span className="mono" style={{ fontSize:11, color:"var(--ink-faint)" }}>{m.when}</span>
            </div>
            <Button tone="accent" full size="sm" onClick={()=>onOpen(m.id)} icon={<span>✉</span>}>Abrir chat</Button>
          </Panel>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── Messages view ─────────────────────────
function MessagesView({ matches, activeId, setActiveId, onUpdate, role, pushToast, onUnmatch }){
  const active = matches.find(m=>m.id===activeId);
  if(matches.length===0){
    return (
      <div style={{ display:"grid", placeItems:"center", height:"100%" }}>
        <div style={{ textAlign:"center", maxWidth:340 }}>
          <div style={{ fontSize:40 }}>✉️</div>
          <h3 style={{ fontSize:19, marginTop:8 }}>Todavía no hay chats</h3>
          <p style={{ color:"var(--ink-soft)", fontSize:13.5, marginTop:6 }}>
            {role==="pyme" ? "Hacé Swipe Approved en Descubrir para abrir tu primer chat." : "Tus oportunidades aparecerán acá al matchear."}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display:"grid", gridTemplateColumns:"288px 1fr", height:"100%", overflow:"hidden" }}>
      {/* list */}
      <div style={{ borderRight:"var(--bd) solid var(--ink)", overflowY:"auto", background:"var(--paper)" }}>
        <div style={{ padding:"15px 16px 8px" }}>
          <div className="eyebrow">Chats activos</div>
        </div>
        {matches.map(m=>{
          const last = [...m.messages].reverse().find(x=>x.text) || {};
          return (
            <button key={m.id} onClick={()=>setActiveId(m.id)} style={{
              width:"100%", textAlign:"left", display:"flex", gap:11, padding:"12px 16px", cursor:"pointer",
              background: m.id===activeId ? "var(--surface)" : "transparent",
              border:"none", borderBottom:"1.5px solid rgba(33,27,18,.08)",
              borderLeft: "3px solid " + (m.id===activeId ? "var(--accent)" : "transparent"),
            }}>
              <Avatar text={m.advisor.monogram} accent={m.advisor.accent} size={42} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:14, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{m.advisor.name}</span>
                  {m.married
                    ? <span title="Activo" style={{ color:"var(--success)", fontSize:12 }}>●</span>
                    : <span className="mono" style={{ fontSize:9.5, color:"var(--ink-faint)", whiteSpace:"nowrap" }}>{m.status}</span>}
                </div>
                <div style={{ fontSize:12, color:"var(--ink-soft)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginTop:2 }}>
                  {last.text || (last.kind==="proposal"?"📄 Propuesta de contrato":"Nuevo match — saludá 👋")}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {/* thread */}
      <div style={{ overflow:"hidden" }}>
        {active
          ? <ChatView key={active.id} match={active} role={role} pushToast={pushToast}
              onUpdate={(updater)=> onUpdate(active.id, updater)} onUnmatch={onUnmatch} />
          : <div style={{ display:"grid", placeItems:"center", height:"100%", color:"var(--ink-soft)" }} className="mono">Seleccioná un chat</div>}
      </div>
    </div>
  );
}

// ───────────────────────── App ─────────────────────────
function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [role, setRole] = useA(null);
  const [view, setView] = useA("discover");
  const [pymeMatches, setPymeMatches] = useA(()=>{
    const demoC = enrichContract({
      ...standardContract(ADVISORS[0]),
      durationMonths:3, start:"2026-04-10", deadline:"2026-07-10", commissionPct:5,
      objective:"Optimizar el proceso de marketing digital y aumentar las ventas provenientes de anuncios pagados en un 25%.",
    });

    const demoCompleted = enrichContract({
      ...standardContract(ADVISORS[1]),
      durationMonths:3, start:"2026-01-15", deadline:"2026-04-15",
      objective:"Optimizar el proceso de conversión digital y reducir el CPA en un 25%.",
      advisorResultPct:8,
    }, { contractStatus:"completed", phases:DEMO_PHASES_DONE, kpis:DEMO_KPIS_DONE, deliverables:DEMO_DELIVERABLES_DONE, salesBaseline:DEMO_SALES_BASELINE_DONE,
      rating:{ stars:5, comment:"Excelente trabajo. Diego logró todos los objetivos del contrato y mejoró nuestro proceso de checkout radicalmente. Lo recomendaría sin dudarlo." }
    });

    const crmPhases = [
      { id:"cr1", name:"Configuración CRM", status:"completed",
        objectives:[{label:"Setup de HubSpot",done:true},{label:"Migración de 2,400 contactos",done:true},{label:"Flujos de automatización",done:true}],
        report:{submitted:true, description:"CRM configurado con 3 flujos automáticos de seguimiento post-compra. Base de datos migrada y verificada.", results:"2,400 contactos migrados. Retención de clientes: 28% → 41%.", observations:"El equipo requiere capacitación básica en el uso de los flujos.", submittedAt:"15 Nov 2025"}},
      { id:"cr2", name:"Automatización de Recompra", status:"completed",
        objectives:[{label:"Secuencias de email activas",done:true},{label:"Segmentación por valor de cliente",done:true},{label:"Dashboard de retención activo",done:true}],
        report:{submitted:true, description:"3 secuencias de email activadas. ROI de automatización del 520%. Todos los objetivos del contrato cumplidos.", results:"Tasa de recompra: 28% → 41%. ROI automatización: 520%.", observations:"Proyecto completado dentro del plazo.", submittedAt:"02 Mar 2026"}},
    ];
    const demoToRate = enrichContract({
      ...standardContract(ADVISORS[2]),
      durationMonths:6, start:"2025-10-01", deadline:"2026-04-01", advisorResultPct:8,
      objective:"Implementar CRM y automatización para mejorar la retención de clientes en un 20%.",
    }, { contractStatus:"to_rate", phases:crmPhases,
      kpis:[{label:"Retención de clientes",before:"28%",after:"41%",positive:true},{label:"ROI de automatización",before:"—",after:"520%",positive:true}],
      deliverables:[{label:"Setup de CRM y migración",done:true},{label:"Flujos de automatización activos",done:true},{label:"Reporte final del proyecto",done:true}],
    });

    const cancelledPhases = [
      { id:"ca1", name:"Análisis de Pricing", status:"completed",
        objectives:[{label:"Auditoría de precios actuales",done:true},{label:"Análisis de competidores",done:true},{label:"Estructura de costos",done:false}],
        report:{submitted:true, description:"Se completó la auditoría inicial de precios y análisis competitivo. El contrato fue cancelado antes de implementar los cambios.", results:"Margen bruto actual: 38%. Potencial de mejora: +8 puntos.", observations:"Las partes no llegaron a un acuerdo en los honorarios de implementación.", submittedAt:"20 Mar 2026"}},
      { id:"ca2", name:"Implementación de Nuevo Pricing", status:"pending",
        objectives:[{label:"Ajuste de precios por línea",done:false},{label:"Comunicación a clientes",done:false},{label:"Monitoreo de resultados",done:false}],
        report:null},
    ];
    const demoCancelled = enrichContract({
      ...standardContract(ADVISORS[3]),
      durationMonths:3, start:"2026-03-01", deadline:"2026-06-01", advisorResultPct:10,
      objective:"Reestructurar el pricing para mejorar el margen bruto en 12 puntos.",
    }, { contractStatus:"cancelled", phases:cancelledPhases,
      kpis:[], deliverables:[{label:"Auditoría de precios",done:true},{label:"Propuesta de nuevo pricing",done:false},{label:"Implementación de cambios",done:false}],
    });

    return [
      { id:"m_a1_demo", advisor:ADVISORS[0], compat:5, when:"Hace 2 meses", need:"Aumentar ventas de pauta digital 25%", status:"Contrato activo", married:true, contract:demoC,
        messages:[...(SEED_MESSAGES.a1||[]),{ from:"them", text:"Perfecto. Puedo arrancar la auditoría esta semana si formalizamos.", t:"10:20" },{ from:"me", text:"Dale, lo hacemos.", t:"10:28" },{ from:"system", kind:"married", contract:demoC, t:"10:30" }]},
      { id:"m_completed", advisor:ADVISORS[1], compat:4, when:"Hace 4 meses", need:"Optimizar conversión digital", status:"Completado", married:true, contract:demoCompleted,
        messages:[{ from:"them", text:"Hola, soy Diego. Revisé el contexto de Hilo & Aguja y el reto de conversión es justo mi especialidad.", t:"09:10" },{ from:"system", kind:"married", contract:demoCompleted, t:"09:30" }]},
      { id:"m_to_rate", advisor:ADVISORS[2], compat:4, when:"Hace 6 meses", need:"Implementar CRM y automatización", status:"Por Calificar", married:true, contract:demoToRate,
        messages:[{ from:"them", text:"Hola, soy Valeria. El proyecto de CRM y automatización quedó completado.", t:"08:00" },{ from:"system", kind:"married", contract:demoToRate, t:"08:05" }]},
      { id:"m_cancelled", advisor:ADVISORS[3], compat:3, when:"Hace 3 meses", need:"Reestructurar pricing", status:"Cancelado", married:true, contract:demoCancelled,
        messages:[{ from:"them", text:"Hola, soy Andrés. El contrato fue cancelado antes de la implementación.", t:"07:00" },{ from:"system", kind:"married", contract:demoCancelled, t:"07:10" }]},

      // Chats activos de negociación (sin contrato activo aún)
      { id:"m_sofia", advisor:ADVISORS[4], compat:4, when:"Hace 1 día", need:"Mejorar estrategia de contenido y branding",
        status:"Propuesta aceptada", married:false,
        contract:{ ...standardContract(ADVISORS[4]), durationMonths:2, budget:900000, retainer:135000, advisorResultPct:7,
          objective:"Elevar la interacción orgánica de 1.8% a 2.7% y duplicar el alcance mensual." },
        messages:[
          { from:"them", text:"Hola, soy Sofía. Vi el perfil de Hilo & Aguja y tengo experiencia exacta en marcas de moda.", t:"14:30" },
          { from:"me",   text:"Perfecto, me interesa ver los números.", t:"14:45" },
          { from:"them", text:"Preparé una propuesta de contrato para que la revises.", t:"14:50" },
          { from:"them", kind:"proposal", contract:{ ...standardContract(ADVISORS[4]), durationMonths:2, budget:900000, retainer:135000, advisorResultPct:7 }, t:"14:51" },
          { from:"system", kind:"advisor-decision", decision:"accepted", t:"14:52" },
        ]},
      { id:"m_rodrigo", advisor:{ id:"a6", name:"Rodrigo Campos", monogram:"RC", role:"E-commerce & Logística", accent:"warning" },
        compat:3, when:"Hace 3 horas", need:"Optimizar logística y gestión de inventario",
        status:"Nuevo match", married:false, contract:null,
        messages:[
          { from:"them", text:"Hola, soy Rodrigo. Me especializo en operaciones y logística para retail. Vi que tienen catálogo en línea.", t:"09:10" },
          { from:"them", text:"¿Tienen problemas con la gestión de inventario o los tiempos de entrega?", t:"09:11" },
        ]},
    ];
  });
  const [advisorMatches, setAdvisorMatches] = useA(()=> OPPORTUNITIES.map(o=>{
    const msgs = [
      { from:"them", text:`Hola, soy de ${o.pyme}. Buscamos: ${o.need.toLowerCase()}. ¿Lo podrías ayudar?`, t:"09:40" },
      ...(o.status==="Negociando" ? [
        { from:"them", text:"Te preparamos una propuesta con el contrato estándar de PymeBoost. ¿La aceptás o la rechazás?", t:"09:46" },
        { from:"them", kind:"proposal", contract:{ ...standardContract(null), budget:o.budget, durationMonths:3, retainer:360000 }, t:"09:46" },
      ] : []),
    ];
    if(o.id==="o2"){
      const c = enrichContract({ ...standardContract(null), budget:o.budget, durationMonths:3, retainer:160000, start:"2026-05-01", deadline:"2026-08-01", objective:"Optimizar el embudo de suscripciones y reducir el abandono de clientes en un 20%." }, { phases:DEMO_PHASES_VERDE, kpis:DEMO_KPIS_VERDE, deliverables:DEMO_DELIVERABLES_VERDE });
      return { id:o.id, advisor:{ name:o.pyme, monogram:o.monogram, role:o.industry, accent:"success" }, compat:o.compat, when:"Hace 5 semanas", need:o.need, status:"Contrato activo", married:true, contract:c, messages:[...msgs,{ from:"system", kind:"married", contract:c, t:"10:00" }] };
    }
    if(o.id==="o3"){
      const c3 = enrichContract({ ...standardContract(null), budget:o.budget, durationMonths:3, retainer:180000, start:"2026-05-15", deadline:"2026-08-15", objective:"Reducir el CPA en campañas de demos de SaaS en un 20% y aumentar la tasa de conversión trial→pago." }, { phases:[
        { id:"nt1", name:"Auditoría de Campañas SaaS", status:"completed", objectives:[{label:"Análisis del funnel de demos",done:true},{label:"Revisión de segmentación B2B",done:true},{label:"Baseline de CPA y conversión",done:true}], report:{submitted:true, description:"Auditoría completada. CPA actual muy alto por segmentación genérica en LinkedIn.", results:"CPA baseline: $48. Tasa trial→pago: 12%.", observations:"La segmentación por cargo y tamaño de empresa es clave.", submittedAt:"28 May 2026"}},
        { id:"nt2", name:"Optimización de Campañas B2B", status:"active", objectives:[{label:"Nueva segmentación por ICP",done:false},{label:"Creativos por vertical",done:false},{label:"A/B testing de landing pages",done:false}], report:null},
      ], kpis:[{label:"CPA de demos",before:"$48",after:"—",positive:true},{label:"Tasa trial→pago",before:"12%",after:"—",positive:true}], deliverables:[{label:"Reporte de auditoría SaaS",done:true},{label:"Reporte de optimización B2B",done:false},{label:"Análisis final de ROI",done:false}] });
      return { id:o.id, advisor:{ name:o.pyme, monogram:o.monogram, role:o.industry, accent:"secondary" }, compat:o.compat, when:"Hace 3 semanas", need:o.need, status:"Contrato activo", married:true, contract:c3, messages:[...msgs,{ from:"system", kind:"married", contract:c3, t:"10:05" }] };
    }
    return { id:o.id, advisor:{ name:o.pyme, monogram:o.monogram, role:o.industry, accent:"primary" }, compat:o.compat, when:o.when, need:o.need, status:o.status, married:false, contract:null, messages:msgs };
  }).concat([
    // Chats activos adicionales para negociar (sin contrato)
    { id:"o4", advisor:{ name:"TechStart CR", monogram:"TC", role:"SaaS / Tecnología", accent:"secondary" },
      compat:4, when:"Hace 2 horas", need:"Escalar adquisición de usuarios B2B",
      status:"Negociando", married:false,
      contract:{ ...standardContract(null), budget:1400000, retainer:200000, durationMonths:3,
        objective:"Reducir el CAC y escalar el proceso de adquisición de clientes B2B.", advisorResultPct:6,
        metrics:[{label:"Costo de adquisición",target:"−20%"},{label:"Tasa trial→pago",target:"+30%"},{label:"Demos agendados",target:"+40%"}],
        plan:["Auditar el funnel de adquisición actual.","Definir ICP y segmentación B2B.","Optimizar campañas de LinkedIn y Google.","Diseñar landing pages por vertical.","Medir y ajustar semanalmente."] },
      messages:[
        { from:"them", text:"Hola Mariana, somos TechStart CR. Desarrollamos software B2B y necesitamos escalar adquisición.", t:"10:00" },
        { from:"me",   text:"Perfecto. Mi experiencia en B2B y performance ads encaja con eso.", t:"10:20" },
        { from:"them", text:"Nos alegra. Te enviamos una propuesta para que la revises.", t:"10:25" },
        { from:"them", kind:"proposal", contract:{ ...standardContract(null), budget:1400000, retainer:200000, durationMonths:3 }, t:"10:26" },
      ]},
    { id:"o5", advisor:{ name:"Branding CR", monogram:"BC", role:"Retail / Moda", accent:"primary" },
      compat:3, when:"Hace 5 horas", need:"Rediseñar identidad visual y estrategia de marca",
      status:"Nuevo match", married:false, contract:null,
      messages:[
        { from:"them", text:"Hola, somos Branding CR. Queremos renovar la identidad de nuestra marca de ropa y necesitamos una experta en performance.", t:"08:30" },
        { from:"them", text:"¿Tenés experiencia trabajando con marcas de moda en reposicionamiento?", t:"08:31" },
      ]},
  ]));
  const [activeId, setActiveId] = useA(null);
  const [toast, setToast] = useA(null);
  const [authed, setAuthed] = useA(false);

  const variant = VARIANT_MAP[t.cardVariant] || "classic";

  // hash navigation para Maze UX tracking
  useAE(()=>{
    let hash;
    if (!authed)    hash = 'auth';
    else if (!role) hash = 'role';
    else            hash = `${role}-${view}`;
    window.location.hash = hash;
  }, [authed, role, view]);

  // aplicar tweaks de tema
  useAE(()=>{
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-deep", `color-mix(in srgb, ${t.accent} 76%, #000)`);
    root.setAttribute("data-retro", RETRO_MAP[t.retro] || "subtle");
    const bf = BRAND_FONTS.find(f=>f.family===t.brandFont) || BRAND_FONTS[0];
    root.style.setProperty("--font-display", `'${bf.family}', ${bf.fallback}`);
  }, [t.accent, t.retro, t.brandFont]);

  const pushToast = (x)=>{ setToast(x); clearTimeout(window.__tt); window.__tt = setTimeout(()=>setToast(null), 2600); };

  const matches = role==="pyme" ? pymeMatches : advisorMatches;
  const setMatches = role==="pyme" ? setPymeMatches : setAdvisorMatches;

  const onMatch = (adv)=>{
    setPymeMatches(prev=>{
      if(prev.some(m=>m.advisor.id===adv.id)) return prev;
      const seed = SEED_MESSAGES[adv.id] || [{ from:"them", text:`¡Hola! Soy ${adv.name.split(" ")[0]}. Cuéntame qué querés mejorar en ${PYME.name}.`, t:"10:00" }];
      const nm = { id:"m_"+adv.id, advisor:adv, status:"Nuevo match", married:false, contract:null, messages:seed };
      return [nm, ...prev];
    });
    pushToast({ text:`¡Match con ${adv.name.split(" ")[0]}! Chat habilitado.`, tone:"success", icon:"♥" });
  };

  const updateMatch = (id, updater)=>{
    setMatches(prev => prev.map(m=>{
      if(m.id!==id) return m;
      const next = typeof updater==="function" ? updater(m) : updater;
      // al casar: cerrar otros chats de negociación (solo PYME)
      return next;
    }).map(m=>{
      // si este match quedó married y somos pyme, marcar otros como cerrados visualmente
      return m;
    }));
  };

  const openChat = (id)=>{ setActiveId(id); setView("messages"); };

  const pickRole = (r)=>{ setRole(r); setView("discover"); setActiveId(null); };

  if(!authed){
    return (<>
      <AuthScreen onLogin={(r)=>{ setAuthed(true); setRole(r||"pyme"); }} pushToast={pushToast} />
      <Toast toast={toast} />
      <TweaksUI t={t} setTweak={setTweak} />
    </>);
  }

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar role={role} view={view} setView={setView} matches={matches} onSwitchRole={()=>{ setRole(null); setAuthed(false); }} />
      <main style={{ flex:1, minWidth:0, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {view==="discover" && (role==="pyme"
          ? <DiscoverPYME variant={variant} onMatch={(adv)=>{ onMatch(adv); }} />
          : <OpportunitiesAdvisor matches={advisorMatches} onOpen={openChat} />
        )}
        {view==="messages" && (
          <MessagesView matches={matches} activeId={activeId || (matches[0] && matches[0].id)}
            setActiveId={setActiveId} onUpdate={updateMatch} role={role} pushToast={pushToast}
            onUnmatch={(id)=>{ setMatches(prev=>prev.filter(m=>m.id!==id)); setActiveId(null); pushToast({ text:"Match eliminado", tone:"ink", icon:"✕" }); }} />
        )}
        {view==="contracts" && (
          <DashboardView matches={matches} role={role} onUpdate={updateMatch} pushToast={pushToast} />
        )}
      </main>
      <Toast toast={toast} />
      <TweaksUI t={t} setTweak={setTweak} />
    </div>
  );
}

// ───────────────────────── Tweaks ─────────────────────────
function TweaksUI({ t, setTweak }){
  const presets = ["#3B82F6","#8B5CF6","#16A34A","#D97706","#DC2626","#0EA5A0"];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Tarjeta de matching" />
      <TweakRadio label="Estilo de tarjeta" value={t.cardVariant}
        options={["Clásica","Data","Editorial"]} onChange={v=>setTweak("cardVariant", v)} />

      <TweakSection label="Fuente de marca" />
      <div style={{ display:"grid", gap:6 }}>
        {BRAND_FONTS.map(f=>{
          const on = t.brandFont===f.family;
          return (
            <button key={f.family} onClick={()=>setTweak("brandFont", f.family)}
              style={{
                display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
                textAlign:"left", padding:"7px 10px", borderRadius:8, cursor:"pointer",
                border: on ? "1.5px solid "+t.accent : ".5px solid rgba(0,0,0,.12)",
                background: on ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.5)",
                boxShadow: on ? "0 0 0 2px "+t.accent+"33" : "none",
              }}>
              <span style={{ fontFamily:`'${f.family}', ${f.fallback}`, fontSize:19, lineHeight:1, color:"#29261b" }}>PymeBoost</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8.5, letterSpacing:".04em", color:"rgba(41,38,27,.5)", textAlign:"right", flexShrink:0, maxWidth:74 }}>{f.note}</span>
            </button>
          );
        })}
      </div>

      <TweakSection label="Tema Retro" />
      <TweakColor label="Color de acento" value={t.accent} onChange={v=>setTweak("accent", v)} />
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {presets.map(c=>(
          <button key={c} title={c} onClick={()=>setTweak("accent", c)}
            style={{ width:24, height:24, borderRadius:6, cursor:"pointer", background:c,
              border: t.accent.toLowerCase()===c.toLowerCase() ? "2px solid #29261b" : ".5px solid rgba(0,0,0,.15)" }} />
        ))}
      </div>
      <TweakRadio label="Intensidad retro" value={t.retro}
        options={["Sutil","Equilibrado","Expresivo"]} onChange={v=>setTweak("retro", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
