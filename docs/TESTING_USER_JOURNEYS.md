# PymeBoost MVP — Testing Guide & User Journeys

Documento operativo para **testing completo del MVP**. Define las user journeys (PYME + Advisor) con datos reales, credenciales de prueba, y pasos copy-paste listos para validar que todo funciona.

---

## 🚀 Inicio rápido: Levantar el stack

### 1. Base de datos (PostgreSQL + Docker)
```bash
docker compose up -d
# Esperar 10s para que Postgres inicie
# Verificar: docker ps (debe haber un contenedor pymeboost-db-1)
```

### 2. Backend (FastAPI + uvicorn)
```bash
cd backend
python -m venv .venv                      # una vez
.venv/Scripts/python.exe -m pip install -r requirements.txt
cd ..
backend/.venv/Scripts/python.exe -m uvicorn backend.main:app --reload --port 8000
```
Verificar: `http://localhost:8000/health` → `{"status":"ok"}`

### 3. Frontend (Next.js)
En otra terminal:
```bash
cd frontend
npm install                                # una vez
npm run dev
```
Verificar: `http://localhost:3000` → landing page visible

---

## 📋 Credenciales de prueba

### PYMEs
| Email | Password | Nombre | Empresa | Rol |
|-------|----------|--------|---------|-----|
| `maria@cafedelvalle.cr` | `DemoPass123!` | María Rodríguez | Cafetería del Valle | PYME |
| `carlos@techsoluciones.cr` | `DemoPass123!` | Carlos Jiménez | TechSoluciones CR | PYME |

### Advisors
| Email | Password | Nombre | Especialidad | Rol |
|-------|----------|--------|--------------|-----|
| `ana@asesores.cr` | `DemoPass123!` | Ana López Solano | Marketing & Branding | Advisor |
| `roberto@asesores.cr` | `DemoPass123!` | Roberto Mora Castro | Consultoría Financiera | Advisor |
| `luis@asesores.cr` | `DemoPass123!` | Luis Vargas Núñez | Transformación Digital | Advisor |

---

## 🎯 Journey 1: PYME — Flujo completo (María Rodríguez)

### Escenario
María es dueña de la **Cafetería del Valle** y necesita mejorar su posicionamiento de marca y aumentar ventas. Usa PymeBoost para encontrar un advisor especializado.

### Paso 1: Login
1. Abre `http://localhost:3000`
2. En el landing, haz clic en **"Iniciar sesión"** (pestaña Login)
3. Selecciona el toggle **"PYME"** (debe estar visible)
4. Ingresa:
   - Email: `maria@cafedelvalle.cr`
   - Contraseña: `DemoPass123!`
5. Haz clic en **"Entrar"**
6. ✅ Deberías ver el **Dashboard** (si es la primera vez, está casi vacío)

**Datos esperados:**
- Nombre: María Rodríguez
- Empresa: Cafetería del Valle
- Rol: PYME (visible en el header/perfil)

---

### Paso 2: Descubrir Advisors (Matching)
1. En el menú de navegación, haz clic en **"Descubrir"** (o "Matching")
2. Verás un **deck de advisors tipo Tinder** con:
   - Foto del advisor
   - Nombre y especialidad
   - Score de compatibilidad
   - Tarifa mensual (Retainer)
3. **Revisa 3 advisors:**

**Advisor 1: Ana López Solano**
- Especialidad: Marketing & Branding
- Compatibilidad: ~85%
- Retainer: ₡45,000/mes
- Acción: **Aprueba** (swipe derecha o botón ✓)
- Esperado: ✅ Match creado, contador actualiza

**Advisor 2: Roberto Mora Castro**
- Especialidad: Consultoría Financiera
- Compatibilidad: ~70%
- Retainer: ₡60,000/mes
- Acción: **Rechaza** (swipe izquierda o botón ✗)
- Esperado: ✅ No-match registrado, siguiente advisor aparece

**Advisor 3: Luis Vargas Núñez**
- Especialidad: Transformación Digital
- Compatibilidad: ~65%
- Retainer: ₡55,000/mes
- Acción: **Aprueba** (swipe derecha)
- Esperado: ✅ Match creado

**Validaciones en backend:**
```bash
# GET advisors reales (no mock)
curl -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  http://localhost:8000/api/matching/recommendations/11111111-1111-1111-1111-111111111101

# POST swipe (Ana López aprobada)
curl -X POST http://localhost:8000/api/matching/swipe \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "pyme_id": "11111111-1111-1111-1111-111111111101",
    "advisor_id": "22222222-2222-2222-2222-222222222201",
    "decision": "match"
  }'
# Esperado: 201 Created { "match_id": "33333333-3333-3333-3333-333333333301" }
```

---

### Paso 3: Enviar mensajes y negociar contrato
1. En el menú, haz clic en **"Mensajes"**
2. Verás una lista de conversaciones. Haz clic en **"Cafetería del Valle ↔ Ana López"**
3. Se abre el **chat** con historial:
   - Mensaje de sistema: "¡Hicieron match!"
   - Mensaje tuyo: "Hola Ana, queremos mejorar el posicionamiento..."
   - Respuesta de Ana: "¡Hola María! Te preparo una propuesta..."

**Envía un mensaje:**
- Escribe: `Cuéntame más sobre tu experiencia en marketing de café`
- Haz clic en **"Enviar"** o presiona Enter
- ✅ El mensaje aparece en el chat

**Respuesta del Advisor (simulada):**
- Verás una respuesta automática de Ana (mock data)

**Propuesta de contrato embebida:**
- En el chat, verás una **tarjeta de contrato propuesta** con:
  - Presupuesto: ₡800,000
  - Retainer: ₡150,000/mes
  - Duración: 6 meses (julio-dic 2026)
  - Objetivo: "Aumentar ventas 20% en 6 meses"
  - Comisión PymeBoost: 5%

**Negocia el contrato:**
1. Haz clic en **"Negociar"** (o similar) en la tarjeta
2. Se abre un **modal de negociación** con campos editables:
   - Presupuesto: `800000` (editable)
   - Retainer mensual: `150000` (editable)
   - Duración: `6 meses` (editable)
   - Objetivo: `Aumentar ventas 20%` (editable)
3. Modifica si quieres (ej: presupuesto a `700000`)
4. Haz clic en **"Proponer contra-oferta"**
5. ✅ Se envía la contrapropuesta al advisor

---

### Paso 4: Monitor Dashboard
1. En el menú, haz clic en **"Mi Proyecto"** (o "Dashboard")
2. Verás:
   - **Nombre del contrato activo**: "Cafetería del Valle + Ana López"
   - **Anillo de progreso**: muestra avance del proyecto
   - **Fases colapsables**: 
     - Fase 1: "Análisis y Diagnóstico" (en curso)
       - Subfase: "Recolección de datos" (70% completa)
       - KPIs: Visitas web (+15%), Conversión (+8%)
     - Fase 2: "Estrategia de Marketing" (pendiente)
     - Fase 3: "Implementación" (pendiente)
   - **Tabla de KPIs**: muestra métricas reales vs. objetivos
   - **Distribución financiera**: gráfico de presupuesto
   - **Tiempo restante**: barra visual de duración

**Validaciones:**
- ✅ Contrato está en estado `negotiating` (visible en UI)
- ✅ PYME puede ver el progreso
- ✅ Métricas cargan desde backend

**Endpoint backend:**
```bash
curl -H "Authorization: Bearer <JWT>" \
  http://localhost:8000/api/projects/active/tracking
# Esperado: 200 { "project_id": "...", "phases": [...], "kpis": [...] }
```

---

### Paso 5: Logout
1. En el header (esquina superior derecha), haz clic en **perfil/avatar**
2. Selecciona **"Cerrar sesión"**
3. ✅ Redirige a `/login`

---

## 🎯 Journey 2: Advisor — Flujo completo (Ana López)

### Escenario
Ana es una consultora de marketing que busca nuevas oportunidades. Recibe un match de la Cafetería del Valle y responde la propuesta.

### Paso 1: Login como Advisor
1. Abre `http://localhost:3000/login`
2. Selecciona el toggle **"Asesor"** (Advisor)
3. Ingresa:
   - Email: `ana@asesores.cr`
   - Contraseña: `DemoPass123!`
4. Haz clic en **"Entrar"**
5. ✅ Deberías ver el **Dashboard del Advisor**

**Datos esperados:**
- Nombre: Ana López Solano
- Especialidad: Marketing & Branding
- Rol: Advisor

---

### Paso 2: Descubrir Oportunidades (PYME matching)
1. En el menú, haz clic en **"Descubrir"** (o "Oportunidades")
2. Para **Advisors**, la UI es diferente:
   - En lugar de un **deck Tinder**, ves una **grid de PYMEs** como tarjetas
   - Cada tarjeta muestra: nombre, industria, tamaño, compatibilidad
3. Verás **"Cafetería del Valle"** como oportunidad top (85% compatibilidad)
4. Haz clic para ver detalles:
   - Empresa: Cafetería del Valle
   - Dueño: María Rodríguez
   - Industria: Alimentos & Bebidas
   - Tamaño: Pequeña
   - Descripción: "Cafetería de especialidad..."

---

### Paso 3: Responder propuesta de contrato
1. En el menú, haz clic en **"Mensajes"**
2. Verás la conversación con **"Cafetería del Valle"**
3. Abre el chat
4. Verás el **historial de mensajes** (igual que la PYME)
5. **Propuesta de contrato** embebida en el chat

**Para Advisors, el modal es distinto:**
- No aparece "Marry the Prospect" (exclusivo para PYME)
- Ves botones de **acción en la propuesta**:
  - **"Aceptar"** → contrato firmado
  - **"Contra-oferta"** → abrir modal para negociar
  - **"Rechazar"** → declinar oportunidad

**Acepta la propuesta:**
1. Haz clic en **"Aceptar"** en la tarjeta de contrato
2. ✅ Contrato pasa a estado `active` (signed)
3. Verás confirmación en el chat

---

### Paso 4: Monitor Proyecto activo
1. En el menú, haz clic en **"Mi Proyecto"** (o "Contrato Activo")
2. Para Advisors, ves:
   - **Proyecto**: "Cafetería del Valle + Ana López"
   - **Contraparte**: María Rodríguez (PYME)
   - **Fases y progreso**: igual que PYME, pero desde perspectiva del advisor
   - **Dashboard de desempeño**: KPIs, avance, cumplimiento

---

### Paso 5: Logout
1. Haz clic en perfil → **"Cerrar sesión"**
2. ✅ Redirige a `/login`

---

## 🔗 Journey 3: Full Flow (Crear cuenta + Login)

### PYME Nueva
1. Abre `http://localhost:3000`
2. En la landing, haz clic en **"Crear cuenta"** (pestaña Register)
3. Selecciona **"PYME"**
4. Rellena el formulario:
   - Nombre propietario: `Juan Pérez`
   - Email: `juan@empresanueva.cr`
   - Teléfono: `+506 8888-9999`
   - Cédula jurídica: `3-101-999999`
   - Nombre empresa: `Empresa Nueva SRL`
   - Tamaño: `Pequeña`
   - Industria: `Tecnología` (o cualquiera)
   - Descripción: `Startup de desarrollo de apps`
   - Contraseña: `DemoPass123!`
   - Confirmar: `DemoPass123!`
5. Haz clic en **"Registrarse"**
6. ✅ Sistema crea usuario en `PB_Pymes` y `PB_AuthCredentials`
7. ✅ Te loguea automáticamente y redirige al Dashboard

**Validación backend:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@empresanueva.cr",
    "password": "DemoPass123!",
    "account_type": "pyme",
    "pyme": {
      "owner_name": "Juan Pérez",
      "company_name": "Empresa Nueva SRL",
      "phone": "+506 8888-9999",
      "cedula_juridica": "3-101-999999",
      "industry_code": "technology",
      "company_size_code": "small",
      "description": "Startup de desarrollo de apps"
    }
  }'
# Esperado: 201 { "access_token": "...", "role": "pyme" }
```

### Advisor Nuevo
1. Similar a PYME, pero en la pestaña Register de Advisor:
   - Nombre: `María Consultor`
   - Email: `maria.consultor@asesores.cr`
   - Teléfono: `+506 8888-8888`
   - LinkedIn: `https://linkedin.com/in/maria-consultor`
   - Descripción: `Consultora senior en finanzas`
   - Industria especialización: `Finanzas`
   - Tarifa base: `₡65,000`
   - Contraseña: `DemoPass123!`

---

## 🧪 Testing checklist

### Auth & Login
- [ ] Login PYME con `maria@cafedelvalle.cr` → redirige a `/dashboard`
- [ ] Login Advisor con `ana@asesores.cr` → redirige a `/dashboard`
- [ ] Password incorrecto → error message
- [ ] Email no registrado → error message
- [ ] Logout → redirige a `/login`
- [ ] Guard: acceso a `/dashboard` sin token → redirige a `/login`
- [ ] Register PYME nueva → crea cuenta y loguea
- [ ] Register Advisor nuevo → crea cuenta y loguea

### Matching (Discovery)
- [ ] PYME ve deck Tinder de advisors
- [ ] Advisor ve grid de PYMEs
- [ ] Swipe derecha (approve) → match creado, contador actualiza
- [ ] Swipe izquierda (reject) → no-match registrado, siguiente advisor
- [ ] Compatibilidad score muestra correctamente
- [ ] Tarifa y comisión visibles
- [ ] Datos reales vienen del backend (no mock)

### Messaging
- [ ] PYME abre chat con matched advisor
- [ ] Advisor abre chat con PYME
- [ ] Enviar mensaje → aparece en chat
- [ ] Respuesta automática del advisor (mock)
- [ ] Propuesta de contrato embebida en chat
- [ ] Historial de mensajes carga correctamente

### Contratos & Negociación
- [ ] Propuesta visible en chat
- [ ] PYME puede negociar (botón "Negociar")
- [ ] Modal abre con campos editables
- [ ] Contra-oferta se envía al advisor
- [ ] Advisor recibe la contra-oferta
- [ ] Advisor puede aceptar, rechazar, o contra-ofertar
- [ ] Contrato pasa a estado `active` cuando ambos aceptan
- [ ] Comisión PymeBoost calcula correctamente (5% default)

### Dashboard & Project Tracking
- [ ] PYME ve proyecto activo con fases
- [ ] Advisor ve proyecto activo con contraparte
- [ ] Anillo de progreso actualiza (visual)
- [ ] Fases son colapsables
- [ ] KPIs muestran métricas reales vs. objetivos
- [ ] Distribución financiera visible
- [ ] Tiempo restante cuenta hacia atrás (o muestra días)
- [ ] Endpoint `GET /api/projects/active/tracking` retorna datos reales

### Navigation & Routing
- [ ] Menú navigation funciona en todas las rutas
- [ ] Links son clickeables
- [ ] Rutas `/dashboard`, `/matching`, `/messaging`, `/contracts` existen
- [ ] Ruta `/reports` puede estar oculta o redirigida
- [ ] Redirección de login al dashboard es fluida

### Error Handling
- [ ] Contacto bloqueado en mensajes (email, teléfono) → error 400
- [ ] Chat ajeno (otro usuario intenta acceder) → 403
- [ ] Match no existente → 404
- [ ] Token expirado → logout automático
- [ ] CORS errores → no debería haber (backend configurado)

---

## 📊 Data esperado en base de datos

Después de ejecutar `seed_dev.sql`, deberías tener:

### PB_Pymes (2 registros)
```
1. Cafetería del Valle (maria@cafedelvalle.cr) - activa
2. TechSoluciones CR (carlos@techsoluciones.cr) - activa
```

### PB_Advisors (3 registros)
```
1. Ana López Solano (ana@asesores.cr) - Marketing - ₡45,000/mes
2. Roberto Mora Castro (roberto@asesores.cr) - Finanzas - ₡60,000/mes
3. Luis Vargas Núñez (luis@asesores.cr) - Digital - ₡55,000/mes
```

### PB_Matches (3 registros)
```
1. Cafetería ↔ Ana López → estado: match (con chat + contrato)
2. Cafetería ↔ Roberto Mora → estado: waiting_swipe (pendiente PYME)
3. TechSoluciones ↔ Luis Vargas → estado: match
```

### PB_ChatSessions (1 registro)
```
1. Chat para match 1 (Cafetería ↔ Ana López) - 4 mensajes iniciales
```

### PB_Contracts (1 registro)
```
1. Contrato para match 1 → estado: negotiating
   - Presupuesto: ₡800,000
   - Retainer: ₡150,000/mes
   - Comisión: 5%
   - Duración: 6 meses
```

### PB_Projects & Tracking (1 proyecto activo)
```
Proyecto: Cafetería del Valle + Ana López
Fases: 3 (Análisis, Estrategia, Implementación)
KPIs: 2+ (Visitas web, Conversión, etc.)
```

---

## 🛠️ Troubleshooting

### Error: "Connection refused" en backend
```bash
# Verificar que Docker está corriendo
docker ps

# Verificar que la BD está lista
docker logs pymeboost-db-1 | tail -20
# Debería ver: "database system is ready to accept connections"

# Reiniciar si es necesario
docker compose down -v
docker compose up -d
```

### Error: "CORS blocked" en frontend
- Verificar que backend está en `:8000` y frontend en `:3000`
- En `backend/main.py`, checar que CORS está configurado para `localhost:3000`

### Error: "Unauthorized" en endpoint
- Verificar que estás pasando el JWT en header:
  ```
  Authorization: Bearer <token>
  ```
- El token se genera en login y guarda en `authStore`

### Error: "Table does not exist"
- Ejecutar en orden:
  ```bash
  docker compose exec db psql -U pymeboost -d pymeboost -f /docker-entrypoint-initdb.d/01_creation.sql
  docker compose exec db psql -U pymeboost -d pymeboost -f /docker-entrypoint-initdb.d/02_seed.sql
  docker compose exec db psql -U pymeboost -d pymeboost -f /docker-entrypoint-initdb.d/03_auth_local.sql
  docker compose exec db psql -U pymeboost -d pymeboost -f /docker-entrypoint-initdb.d/04_seed_dev.sql
  ```

### Frontend no carga endpoints del backend
- Revisar en `frontend/src/services/apiClient.ts` que la URL base es correcta:
  ```typescript
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  ```
- Si necesitas cambiar, edita `.env.local` en `frontend/`:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:8000/api
  ```

---

## 📝 Resumen de endpoints utilizados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario (PYME/Advisor) |
| POST | `/api/auth/login` | Login con email + password |
| GET | `/api/auth/me` | Obtener usuario actual (JWT requerido) |
| POST | `/api/auth/logout` | Logout (limpia token) |
| GET | `/api/matching/recommendations/{pyme_id}` | Obtener advisors recomendados |
| POST | `/api/matching/swipe` | Registrar swipe (match/reject) |
| GET | `/api/communication/chats/{match_id}/messages` | Obtener mensajes del chat |
| POST | `/api/communication/chats/{match_id}/messages` | Enviar mensaje |
| GET | `/api/contracts/match/{match_id}` | Obtener contrato activo |
| POST | `/api/contracts/match/{match_id}/versions` | Proponer nueva versión (negociación) |
| POST | `/api/contracts/match/{match_id}/accept` | Aceptar contrato |
| GET | `/api/projects/active/tracking` | Obtener tracking de proyecto activo |
| GET | `/api/projects/match/{match_id}/tracking` | Obtener tracking específico |

---

## ✅ Criterios de éxito

El MVP se considera **completo y funcional** cuando:

1. ✅ **Auth funciona end-to-end**: login/register PYME/Advisor, JWT válido, logout limpia sesión
2. ✅ **Matching es real**: swipes se guardan en BD, advisors vienen de BD, no son mock
3. ✅ **Chat funciona**: mensajes se envían/reciben, se guardan en BD, historial es persistente
4. ✅ **Contratos se negocian**: propuestas embebidas en chat, contador-ofertas, aceptación firma
5. ✅ **Dashboard muestra progreso**: fases, KPIs, métricas vienen de BD
6. ✅ **Roles funcionan**: PYME ve una UI, Advisor ve otra (diferente en matching, messaging, dashboard)
7. ✅ **Error handling**: 404, 403, 400 retornan en lugar de crashes
8. ✅ **No hay datos mock en endpoints core**: matching, messaging, contracts, projects son reales

---

**Última actualización**: 2026-06-16
**Estado**: ✅ Listo para testing completo
