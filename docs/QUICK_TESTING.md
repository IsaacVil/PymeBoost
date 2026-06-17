# PymeBoost MVP — Quick Testing (Copy & Paste)

**Instrucciones copy-paste listas. Abre 3 terminales y ejecuta en paralelo.**

---

## Terminal 1: Base de datos

```bash
docker compose up -d
```

Espera 10 segundos. Luego verifica:
```bash
docker ps
# Deberías ver: pymeboost-db-1 running
```

---

## Terminal 2: Backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements.txt
cd ..
backend/.venv/Scripts/python.exe -m uvicorn backend.main:app --reload --port 8000
```

Verifica en navegador: `http://localhost:8000/health`
- Expected: `{"status":"ok"}`

---

## Terminal 3: Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Verifica: `http://localhost:3000`
- Expected: Landing page visible, botones "Iniciar sesión" y "Crear cuenta"

---

## 🎯 Test 1: Login PYME (2 min)

1. En navegador, ve a: `http://localhost:3000`
2. Haz clic en **"Iniciar sesión"** (pestaña)
3. Toggle debe estar en **"PYME"** ✓
4. Copia y pega:
   ```
   Email: maria@cafedelvalle.cr
   Contraseña: DemoPass123!
   ```
5. Haz clic **"Entrar"**
6. ✅ **Deberías estar en el Dashboard**

---

## 🎯 Test 2: Descubrir Advisors - Matching (3 min)

1. En el menú, haz clic **"Descubrir"**
2. Verás un **deck de advisors** (tipo Tinder)
3. **Card 1: Ana López**
   - Especialidad: Marketing
   - Compatibilidad: ~85%
   - Tarifa: ₡45,000/mes
   - **Acción: Swipe derecha (✓) o botón Aprobar**
4. ✅ **Match creado**, siguiente advisor
5. **Card 2: Roberto Mora**
   - Especialidad: Finanzas
   - Compatibilidad: ~70%
   - **Acción: Swipe izquierda (✗) o botón Rechazar**
6. ✅ **No-match registrado**, siguiente advisor
7. **Card 3: Luis Vargas**
   - Especialidad: Digital
   - Compatibilidad: ~65%
   - **Acción: Swipe derecha (✓)**
8. ✅ **Match creado**

---

## 🎯 Test 3: Enviar Mensajes (3 min)

1. En el menú, haz clic **"Mensajes"**
2. Verás una lista de conversaciones
3. Haz clic en **"Cafetería del Valle ↔ Ana López"**
4. Se abre el **chat** con historial:
   - Mensaje sistema: "¡Hicieron match!"
   - Tu mensaje: "Hola Ana..."
   - Respuesta Ana: "Hola María..."
5. **Escribe un mensaje nuevo:**
   ```
   Cuéntame más sobre tu experiencia en marketing de café
   ```
6. Presiona **Enter** o haz clic **"Enviar"**
7. ✅ **Tu mensaje aparece en el chat**

---

## 🎯 Test 4: Negociar Contrato (3 min)

1. En el **mismo chat**, desplázate hacia abajo
2. Verás una **tarjeta de "Propuesta de Contrato"** con:
   - Presupuesto: ₡800,000
   - Retainer: ₡150,000/mes
   - Duración: 6 meses
   - Objetivo: "Aumentar ventas 20%"
   - Comisión: 5% (PymeBoost)
3. Haz clic en **"Negociar"** (o botón de edición)
4. Se abre un **modal con campos editables**
5. **Modifica el presupuesto:**
   - Borra el valor actual: `800000`
   - Escribe nuevo: `700000`
6. Haz clic en **"Proponer contra-oferta"**
7. ✅ **Tu contra-oferta se envía al advisor**

---

## 🎯 Test 5: Monitor Dashboard (2 min)

1. En el menú, haz clic **"Mi Proyecto"** (o "Dashboard")
2. Verás:
   - **Nombre del contrato**: "Cafetería del Valle + Ana López"
   - **Anillo de progreso**: muestra % completado
   - **3 Fases colapsables:**
     - Fase 1: "Análisis y Diagnóstico" (en curso)
       - Subfase: "Recolección de datos" (70%)
     - Fase 2: "Estrategia de Marketing" (pendiente)
     - Fase 3: "Implementación" (pendiente)
   - **Tabla de KPIs**: Visitas web, Conversión, etc.
   - **Distribución financiera**: gráfico de presupuesto
   - **Tiempo restante**: barra visual
3. Haz clic en **"Fase 1"** para expandir/contraer
4. ✅ **Todas las secciones cargan datos reales**

---

## 🎯 Test 6: Logout (1 min)

1. En el header superior derecho, haz clic en el **ícono de perfil**
2. Selecciona **"Cerrar sesión"**
3. ✅ **Redirige a `/login`**
4. URL debe ser: `http://localhost:3000/login`

---

## 🎯 Test 7: Login Advisor (2 min)

1. Estás en `/login`
2. Cambiar toggle a **"Asesor"** ✓
3. Copia y pega:
   ```
   Email: ana@asesores.cr
   Contraseña: DemoPass123!
   ```
4. Haz clic **"Entrar"**
5. ✅ **Dashboard del Advisor (diferente UI)**

---

## 🎯 Test 8: Advisor - Descubrir Oportunidades (2 min)

1. En el menú, haz clic **"Descubrir"**
2. Para Advisors, ves una **grid de PYMEs** (no Tinder)
3. Verás tarjetas con:
   - Nombre empresa: "Cafetería del Valle"
   - Dueño: María Rodríguez
   - Industria: Alimentos
   - Compatibilidad: 85%
4. Haz clic en una tarjeta
5. ✅ **Ves detalles de la PYME**

---

## 🎯 Test 9: Advisor - Responder Propuesta (2 min)

1. En el menú, haz clic **"Mensajes"**
2. Abre el chat: **"Cafetería del Valle"**
3. Desplázate a la **propuesta de contrato**
4. Verás **botones diferentes** (no "Marry the Prospect"):
   - **"Aceptar"** → firma el contrato
   - **"Contra-oferta"** → negotiation modal
   - **"Rechazar"** → declina
5. Haz clic en **"Aceptar"**
6. ✅ **Contrato pasa a estado `active` (signed)**

---

## 🎯 Test 10: Advisor - Dashboard (1 min)

1. En el menú, haz clic **"Mi Proyecto"**
2. Verás:
   - **Proyecto**: "Cafetería del Valle + Ana López"
   - **Contraparte**: "María Rodríguez"
   - **Fases y KPIs**: igual que la PYME
3. ✅ **Mismos datos, perspectiva del Advisor**

---

## 🎯 Test 11: Crear Cuenta PYME Nueva (3 min)

1. Logout del advisor (haz clic perfil → "Cerrar sesión")
2. En `/login`, haz clic **"¿No tienes cuenta?"** o ve a la pestaña **"Crear cuenta"**
3. Toggle en **"PYME"**
4. Rellena con estos datos (copy-paste):
   ```
   Nombre propietario: Juan Pérez
   Email: juan@empresanueva.cr
   Teléfono: +506 8888-9999
   Cédula jurídica: 3-101-999999
   Nombre empresa: Empresa Nueva SRL
   Tamaño: Pequeña
   Industria: Tecnología
   Descripción: Startup de desarrollo de apps
   Contraseña: DemoPass123!
   Confirmar contraseña: DemoPass123!
   ```
5. Haz clic **"Registrarse"**
6. ✅ **Te loguea automáticamente**
7. ✅ **Te envía al Dashboard**

---

## 🎯 Test 12: Crear Cuenta Advisor Nueva (3 min)

1. Logout (perfil → "Cerrar sesión")
2. Ve a **"Crear cuenta"** → toggle **"Asesor"**
3. Rellena con estos datos:
   ```
   Nombre completo: María Consultor
   Email: maria.consultor@asesores.cr
   Teléfono: +506 8888-8888
   LinkedIn: https://linkedin.com/in/maria-consultor
   Descripción: Consultora senior en finanzas
   Industria especialización: Finanzas
   Tarifa base: 65000
   Contraseña: DemoPass123!
   Confirmar: DemoPass123!
   ```
4. Haz clic **"Registrarse"**
5. ✅ **Te loguea automáticamente**
6. ✅ **Dashboard del Advisor nuevo**

---

## 🔍 Validaciones en Backend (curl)

### Test Auth - Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@cafedelvalle.cr",
    "password": "DemoPass123!"
  }'
```
Expected:
```json
{
  "access_token": "eyJ...",
  "role": "pyme",
  "user_id": "11111111-1111-1111-1111-111111111101"
}
```

### Test Matching - Get Recommendations
```bash
curl -H "Authorization: Bearer <YOUR_TOKEN>" \
  http://localhost:8000/api/matching/recommendations/11111111-1111-1111-1111-111111111101
```
Expected: Lista de 3 advisors con compatibilidad, tarifa, etc.

### Test Matching - Swipe
```bash
curl -X POST http://localhost:8000/api/matching/swipe \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "pyme_id": "11111111-1111-1111-1111-111111111101",
    "advisor_id": "22222222-2222-2222-2222-222222222201",
    "decision": "match"
  }'
```
Expected: `201 Created`

### Test Messaging - Send Message
```bash
curl -X POST http://localhost:8000/api/communication/chats/33333333-3333-3333-3333-333333333301/messages \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Cuéntame más sobre tu experiencia"
  }'
```
Expected: `201 Created { "message_id": "..." }`

### Test Dashboard - Get Project Tracking
```bash
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:8000/api/projects/active/tracking
```
Expected: `200 OK { "project_id": "...", "phases": [...], "kpis": [...] }`

---

## 📊 Checklist de testing

- [ ] Test 1: Login PYME ✅
- [ ] Test 2: Matching (swipe) ✅
- [ ] Test 3: Mensajes ✅
- [ ] Test 4: Negociar contrato ✅
- [ ] Test 5: Dashboard ✅
- [ ] Test 6: Logout ✅
- [ ] Test 7: Login Advisor ✅
- [ ] Test 8: Advisor - Oportunidades ✅
- [ ] Test 9: Advisor - Responder ✅
- [ ] Test 10: Advisor - Dashboard ✅
- [ ] Test 11: Register PYME nueva ✅
- [ ] Test 12: Register Advisor nuevo ✅
- [ ] Curl auth/login ✅
- [ ] Curl matching/recommendations ✅
- [ ] Curl matching/swipe ✅
- [ ] Curl messaging ✅
- [ ] Curl dashboard ✅

**Total tiempo estimado: ~35 minutos**

---

## 🆘 Si algo falla

### Backend no inicia
```bash
# Matar proceso anterior
lsof -ti:8000 | xargs kill -9
# O en Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue).OwningProcess | Stop-Process -Force
```

### Frontend no carga
```bash
# Limpiar cache
rm -r frontend/.next
rm -r frontend/node_modules
npm install
npm run dev
```

### BD no conecta
```bash
docker compose down -v
docker compose up -d
# Esperar 15 segundos
```

### Token expirado en curl
- El token dura **24 horas**
- Si falla, hacer login de nuevo y copiar el token nuevo del response

---

**¡Listo! Ahora a testear! 🚀**
