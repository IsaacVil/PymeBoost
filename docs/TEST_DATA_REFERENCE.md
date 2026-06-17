# PymeBoost MVP — Test Data Reference

**Guía rápida de todos los datos pre-cargados en la BD. Imprímelo o tenlo a mano mientras testeas.**

---

## 👥 PYMES (Pre-cargadas)

### PYME 1: Cafetería del Valle ☕
| Campo | Valor |
|-------|-------|
| **ID** | `11111111-1111-1111-1111-111111111101` |
| **Dueño** | María Rodríguez |
| **Email** | `maria@cafedelvalle.cr` |
| **Teléfono** | +506 8888-1101 |
| **Cédula jurídica** | 3-101-111101 |
| **Tamaño** | Pequeña |
| **Industria** | Alimentos & Bebidas |
| **Descripción** | Cafetería de especialidad en San José que busca ordenar sus finanzas y crecer. |
| **Reputación** | 4.5 ⭐ (2 ratings) |
| **Password** | `DemoPass123!` |

**Matches activos:**
- ✅ Match con **Ana López** (estado: `match`) — Con chat + contrato
- ⏳ Match con **Roberto Mora** (estado: `waiting_swipe`) — Pendiente decisión PYME

---

### PYME 2: TechSoluciones CR 💻
| Campo | Valor |
|-------|-------|
| **ID** | `11111111-1111-1111-1111-111111111102` |
| **Dueño** | Carlos Jiménez |
| **Email** | `carlos@techsoluciones.cr` |
| **Teléfono** | +506 8888-1102 |
| **Cédula jurídica** | 3-101-111102 |
| **Tamaño** | Mediana |
| **Industria** | Tecnología |
| **Descripción** | PYME de servicios de TI que necesita estrategia de crecimiento y nuevos mercados. |
| **Reputación** | 0 (sin ratings) |
| **Password** | `DemoPass123!` |

**Matches activos:**
- ✅ Match con **Luis Vargas** (estado: `match`) — Sin chat aún

---

## 👔 ADVISORS (Pre-cargados)

### Advisor 1: Ana López Solano 📱
| Campo | Valor |
|-------|-------|
| **ID** | `22222222-2222-2222-2222-222222222201` |
| **Nombre completo** | Ana López Solano |
| **Nombre display** | Ana López |
| **Email** | `ana@asesores.cr` |
| **Teléfono** | +506 8888-2201 |
| **LinkedIn** | https://www.linkedin.com/in/ana-lopez-demo |
| **Especialidad** | Marketing & Branding para PYMEs |
| **Tarifa base** | ₡45,000/mes |
| **Disponible** | ✅ Sí |
| **Reputación** | 4.8 ⭐ (12 ratings) |
| **Industria** | Servicios profesionales |
| **Password** | `DemoPass123!` |

**Matches activos:**
- ✅ Match con **Cafetería del Valle** (estado: `match`) — Con chat + contrato

---

### Advisor 2: Roberto Mora Castro 💰
| Campo | Valor |
|-------|-------|
| **ID** | `22222222-2222-2222-2222-222222222202` |
| **Nombre completo** | Roberto Mora Castro |
| **Nombre display** | Roberto Mora |
| **Email** | `roberto@asesores.cr` |
| **Teléfono** | +506 8888-2202 |
| **LinkedIn** | https://www.linkedin.com/in/roberto-mora-demo |
| **Especialidad** | Consultoría financiera (presupuestos, flujo de caja, fiscal) |
| **Tarifa base** | ₡60,000/mes |
| **Disponible** | ✅ Sí |
| **Reputación** | 4.6 ⭐ (8 ratings) |
| **Industria** | Servicios profesionales |
| **Password** | `DemoPass123!` |

**Matches activos:**
- ⏳ Match con **Cafetería del Valle** (estado: `waiting_swipe`) — Pendiente respuesta advisor

---

### Advisor 3: Luis Vargas Núñez 🔧
| Campo | Valor |
|-------|-------|
| **ID** | `22222222-2222-2222-2222-222222222203` |
| **Nombre completo** | Luis Vargas Núñez |
| **Nombre display** | Luis Vargas |
| **Email** | `luis@asesores.cr` |
| **Teléfono** | +506 8888-2203 |
| **LinkedIn** | https://www.linkedin.com/in/luis-vargas-demo |
| **Especialidad** | Transformación digital y desarrollo de software |
| **Tarifa base** | ₡55,000/mes |
| **Disponible** | ✅ Sí |
| **Reputación** | 4.9 ⭐ (20 ratings) |
| **Industria** | Tecnología |
| **Password** | `DemoPass123!` |

**Matches activos:**
- ✅ Match con **TechSoluciones CR** (estado: `match`) — Sin chat aún

---

## 🤝 MATCHES (Pre-cargados)

### Match 1: Cafetería ↔ Ana López
```
Match ID:     33333333-3333-3333-3333-333333333301
PYME:         11111111-1111-1111-1111-111111111101 (María / Cafetería)
Advisor:      22222222-2222-2222-2222-222222222201 (Ana López)
Estado:       MATCH ✅
Creado:       [fecha automática]
Chat:         SÍ (ID: 44444444-4444-4444-4444-444444444401)
Contrato:     SÍ (ID: 55555555-5555-5555-5555-555555555501)
Compatibilidad: 85% (estimado)
```

**Historial de estado:**
1. `waiting_swipe` (PYME pendiente decisión)
2. `match` (PYME aprobó)

---

### Match 2: Cafetería ↔ Roberto Mora
```
Match ID:     33333333-3333-3333-3333-333333333302
PYME:         11111111-1111-1111-1111-111111111101 (María / Cafetería)
Advisor:      22222222-2222-2222-2222-222222222202 (Roberto)
Estado:       WAITING_SWIPE ⏳
Creado:       [fecha automática]
Chat:         NO
Contrato:     NO
Compatibilidad: 70% (estimado)
```

**Descripción:** La PYME aún no ha decidido sobre este advisor.

---

### Match 3: TechSoluciones ↔ Luis Vargas
```
Match ID:     33333333-3333-3333-3333-333333333303
PYME:         11111111-1111-1111-1111-111111111102 (Carlos / TechSoluciones)
Advisor:      22222222-2222-2222-2222-222222222203 (Luis)
Estado:       MATCH ✅
Creado:       [fecha automática]
Chat:         NO (aún)
Contrato:     NO (aún)
Compatibilidad: 75% (estimado)
```

---

## 💬 CHAT & MENSAJES (Match 1 solo)

### Chat Session
```
Chat ID:      44444444-4444-4444-4444-444444444401
Match ID:     33333333-3333-3333-3333-333333333301
Activo:       ✅ Sí
Mensajes:     4 iniciales
```

### Mensajes en orden
```
1. [SYSTEM] "¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat."
   Tipo: system
   Hora: [automática]
   
2. [PYME - María] "Hola Ana, queremos mejorar el posicionamiento de la cafetería. ¿Podemos conversar?"
   Tipo: user
   Desde: PYME (11111111...)
   Hora: [automática]
   
3. [ADVISOR - Ana] "¡Hola María! Claro, te preparo una propuesta de tarifa y alcance."
   Tipo: user
   Desde: Advisor (22222222-2222-2222-2222-222222222201)
   Hora: [automática]
   
4. [PROPUESTA] (incrustada en UI como tarjeta de contrato)
   Tipo: proposal
```

---

## 📋 CONTRATO (Match 1 solo)

### Contrato Activo
```
Contract ID:     55555555-5555-5555-5555-555555555501
Match ID:        33333333-3333-3333-3333-333333333301
PYME:            Cafetería del Valle
Advisor:         Ana López
Estado actual:   NEGOTIATING 🔄
Versión actual:  1 (la más reciente)
```

### Versión 1 (Propuesta del Advisor)
```
Version ID:              66666666-6666-6666-6666-666666666601
Número de versión:       1
Propuesto por:           Advisor (Ana López)
Estado de versión:       PENDING_PROPOSAL ⏳

TÉRMINOS PROPUESTOS:
├─ Presupuesto implementación:  ₡800,000
├─ Retainer mensual:            ₡150,000
├─ Duración:                    6 meses
│  ├─ Inicio:                   2026-07-01
│  └─ Fin:                      2026-12-31
├─ Comisión PymeBoost:          5%
├─ Objetivo principal:          "Aumentar las ventas mensuales de la cafetería
│                                en un 20% en 6 meses"
└─ Ganancia advisor (est):      Calculada (pendiente)

DESGLOSE FINANCIERO:
├─ Total presupuesto:           ₡800,000
├─ Retainer (6 meses):          ₡900,000 (150k × 6)
├─ Total inversión PYME:        ₡1,700,000
├─ Comisión PymeBoost (5%):     ₡85,000
├─ Ganancia Advisor (neta):     Pendiente cálculo
└─ Estado:                      Esperando respuesta PYME
```

**Flujo esperado:**
1. PYME recibe propuesta (PENDING_PROPOSAL)
2. PYME contraoferta → nueva versión (PENDING_PROPOSAL)
3. Advisor acepta → versión actual ACCEPTED
4. Contrato pasa a ACTIVE / SIGNED
5. Ambos trabajan bajo estos términos
6. Al final → COMPLETED

---

## 🎯 PROYECTO ACTIVO (Dashboard)

### Proyecto: Cafetería del Valle + Ana López

**Datos básicos:**
```
Project ID:        [generado con contrato]
PYME:              Cafetería del Valle (María)
Advisor:           Ana López
Contrato asociado: 55555555-5555-5555-5555-555555555501
Duración:          2026-07-01 → 2026-12-31 (6 meses)
Objetivo:          Aumentar ventas 20% en 6 meses
Estado general:    EN CURSO 🟢
```

### Fases del Proyecto

#### ✅ Fase 1: Análisis y Diagnóstico (EN CURSO)
```
Progreso general:       70%
Fecha inicio:           2026-07-01
Fecha fin esperada:     2026-07-15

Subfases:
├─ 1.1 Recolección de datos
│   └─ Completitud: 70%
│       Hitos: Encuestas, análisis competencia
│       Recursos: ₡50,000
│       Plazo: 2 semanas
│
├─ 1.2 Diagnóstico de marca
│   └─ Completitud: 40%
│       Hitos: Report de diagnóstico
│       Recursos: ₡30,000
│       Plazo: 1 semana
│
└─ 1.3 Presentación ejecutiva
    └─ Completitud: 0% (no iniciada)
        Hitos: Presentación a stakeholders
        Recursos: ₡20,000
        Plazo: 3 días
```

#### ⏳ Fase 2: Estrategia de Marketing (PENDIENTE)
```
Progreso general:       0%
Fecha inicio estimada:  2026-07-16
Fecha fin estimada:     2026-08-31

Subfases:
├─ 2.1 Definición de target y posicionamiento
├─ 2.2 Plan de contenido y redes
└─ 2.3 Estrategia de pricing y promociones
```

#### ⏳ Fase 3: Implementación (PENDIENTE)
```
Progreso general:       0%
Fecha inicio estimada:  2026-09-01
Fecha fin estimada:     2026-12-31

Subfases:
├─ 3.1 Lanzamiento de campañas digitales
├─ 3.2 Activaciones en-store
└─ 3.3 Seguimiento y ajustes
```

---

## 📊 KPIs (Métricas de seguimiento)

### KPI 1: Visitas Web Mensuales
```
Métrica:        Visitas mensuales al sitio web/redes
Línea base:     2,000 visitas/mes (actual)
Objetivo:       3,000 visitas/mes (en 3 meses)
Plazo:          31 de octubre 2026
Tendencia:      +15% (parcialmente en curso)
Progreso:       15% / 50% objetivo
Verificación:   Google Analytics, Meta Pixel
```

### KPI 2: Tasa de Conversión
```
Métrica:        % visitas → clientes nuevos
Línea base:     8% (actual)
Objetivo:       12% (en 6 meses)
Plazo:          31 de diciembre 2026
Tendencia:      +8% (parcialmente en curso)
Progreso:       8% / 50% objetivo
Verificación:   CRM, punto de venta
```

### KPI 3: Ingresos Mensuales
```
Métrica:        Ingresos brutos mensuales
Línea base:     ₡2,500,000/mes (actual)
Objetivo:       ₡3,000,000/mes (+20% al final del contrato)
Plazo:          31 de diciembre 2026
Tendencia:      +₡200,000 (en curso)
Progreso:       8% / 100% objetivo
Verificación:   Estados financieros, contabilidad
```

---

## 📈 Distribución Financiera

```
PYME: Cafetería del Valle

Inversión total:                ₡1,700,000
├─ Presupuesto implementación:  ₡800,000 (47%)
└─ Retainer (6 meses):          ₡900,000 (53%)

Desglose de presupuesto (₡800k):
├─ Investigación de mercado:    ₡150,000
├─ Diseño de marca:             ₡200,000
├─ Contenido y copywriting:     ₡250,000
└─ Publicidad digital (Google): ₡200,000

Comisión PymeBoost (5%):        ₡85,000
Ganancia Advisor Ana (neta):    ~₡300,000 (estimado)

ROI esperado (6 meses):
├─ Incremento ingresos:         +₡500,000/mes × 6 = ₡3,000,000
├─ Inversión inicial:           -₡1,700,000
└─ ROI neto:                    +₡1,300,000 (76%)
```

---

## 🔐 Autenticación (credenciales)

### Hash de contraseña
- **Password plain:** `DemoPass123!`
- **Algoritmo:** bcrypt con salt (10 rounds)
- **Hash en BD:** `$2a$10$...` (64 chars)
- **Todos los usuarios comparten esta password**

### JWT (al hacer login)
```
Token tipo:     HS256 (HMAC + SHA-256)
Secret:         ${JWT_SECRET} (del .env backend)
Duración:       24 horas
Payload ejemplo:
{
  "sub": "11111111-1111-1111-1111-111111111101",
  "email": "maria@cafedelvalle.cr",
  "role": "pyme",
  "iat": 1718545200,
  "exp": 1718631600
}
```

---

## 🎯 Recomendaciones para pruebas

### Orden sugerido
1. **Test login PYME** (Maria) → acceso a dashboard
2. **Test matching** (ver advisors, swipe)
3. **Test chat** (mensajes, historial)
4. **Test negociación contrato** (propuesta, contraoferta)
5. **Test dashboard** (fases, KPIs, métricas)
6. **Test logout** (sesión limpia)
7. **Test login Advisor** (Ana) → perspectiva distinta
8. **Test register** (cuenta nueva PYME/Advisor)

### Datos que NO deberían ser mock
- ✅ Usuarios (PYME/Advisor)
- ✅ Matches
- ✅ Chats y mensajes
- ✅ Contratos y versiones
- ✅ Proyecto y fases
- ✅ KPIs y métricas

### Datos que SÍ pueden ser mock
- 🔵 Embeddings de IA (para compatibilidad)
- 🔵 Respuestas automáticas del advisor en chat (opcional)
- 🔵 Cálculo de ganancia advisor (pendiente)

---

**Última actualización:** 2026-06-16  
**Estado BD:** ✅ Sincronizada con seed_dev.sql
