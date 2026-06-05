# PymeBoost

Problem Statement: Proveer una conexión orientada a resultados entre PYMES y asesores de alto rendimiento.

Actualmente, iniciar y desarrollar una PYME puede convertirse en un proceso complejo y desgastante, especialmente para emprendedores que no cuentan con experiencia previa en administración, optimización de procesos o escalabilidad empresarial. Muchas pequeñas y medianas empresas enfrentan dificultades para identificar cuáles áreas de su negocio necesitan mejoras, cómo implementar procesos más eficientes y, principalmente, en quién confiar para realizar dichos cambios.

En muchos casos, las PYMES no tienen acceso a asesoría especializada de calidad o terminan contratando servicios sin métricas claras, sin seguimiento y sin garantías reales de resultados. Esto provoca pérdidas económicas, procesos mal implementados y poca sostenibilidad a largo plazo. A esto se suma la falta de plataformas confiables donde las empresas puedan encontrar expertos verificados, comparar experiencias previas y trabajar bajo esquemas transparentes y estructurados.

PymeBoost nace como una solución enfocada específicamente en las PYMES, creando un ecosistema donde las empresas pueden conectarse con advisors y especialistas capaces de optimizar procesos específicos dentro de la organización. La plataforma busca transformar la relación tradicional de consultoría en un modelo basado en resultados, seguimiento continuo y transparencia, asegurando que tanto la PYME como el advisor trabajen alineados bajo objetivos claros y medibles.

--- 

## Authors
 * Isaac Villalobos Bonilla, 2024124285
 * Christopher Daniel Vargas Villalta, 2024108443
 * Santiago Espinoza Rendón, 2024156530
 * Jose Ignacio Paniagua Vargas, 2024163735


--- 

## Funcionamiento de la Plataforma

PymeBoost funciona como una plataforma inteligente que conecta PYMES con advisors especializados en distintas áreas empresariales como administración, automatización, marketing, finanzas, recursos humanos, ventas, logística, análisis de datos y optimización operativa.

La plataforma está enfocada exclusivamente en pequeñas y medianas empresas (PYMES), permitiendo que negocios con necesidades específicas encuentren expertos adecuados según su contexto, objetivos y procesos a optimizar.

Cuando una PYME se registra dentro de la plataforma, debe proporcionar información relacionada con:

* Contexto de la empresa.
* Problemas o procesos a mejorar.
* Objetivos empresariales.
* Necesidades específicas.

A partir de esta información, PymeBoost utiliza agentes de IA y un sistema de matching inteligente para recomendar advisors adecuados según el perfil y necesidades de la empresa.

El sistema sugiere:

* Advisors especializados.
* Problemas o procesos a optimizar.
* Planes de acción.
* Objetivos y métricas de seguimiento.
* Historial y reputación del advisor.

Los advisors pueden registrarse y crear perfiles profesionales dentro de la plataforma, pero no buscan proyectos activamente. Las oportunidades son generadas automáticamente mediante el sistema de recomendaciones de PymeBoost.

Una vez realizado el matching, la PYME puede comunicarse con el advisor mediante un sistema interno de mensajería dentro de la plataforma. A través de este chat ambas partes pueden discutir:

* Necesidades del proyecto.
* Alcance del trabajo.
* Objetivos.
* Expectativas.
* Tarifas preliminares.
* Duración estimada del contrato.

Además, la plataforma muestra previamente un contrato estándar de referencia ofrecido por PymeBoost.

Con el objetivo de mantener la seguridad y transparencia del ecosistema, toda la comunicación debe realizarse dentro de la plataforma. No está permitido compartir:

* Correos electrónicos.
* Números telefónicos.
* Redes sociales.
* Información de contacto externa.

El sistema de mensajería detecta y bloquea automáticamente este tipo de información.

La PYME puede iniciar una propuesta mediante la opción “Negotiate Tariff”, donde se pueden definir elementos preliminares como:

* Tarifa del advisor.
* Duración del contrato.
* Objetivos del proyecto.
* Métricas de éxito.
* Alcance del proceso a optimizar.

Una vez ambas partes llegan a un acuerdo, se utiliza la opción “Marry The Prospect” para formalizar el contrato.

En esta etapa:

* Se puede utilizar el contrato estándar de PymeBoost.
* El contrato puede modificarse según las necesidades de la PYME y del advisor.
* Ambas partes deben aceptar las condiciones antes de activar el contrato.

Una vez el contrato se encuentra activo, PymeBoost habilita un dashboard de seguimiento donde tanto la PYME como el advisor pueden monitorear:

* Estado del contrato.
* Avance del proyecto.
* Fases completadas y activas.
* Objetivos alcanzados.
* Métricas de rendimiento.
* Reportes entregados por fase.
* Tiempo restante del contrato.

Durante cada fase, el advisor debe entregar un pequeño reporte utilizando una plantilla simple proporcionada por PymeBoost. El reporte consiste en una breve descripción de máximo 200 palabras explicando las acciones realizadas, avances y resultados obtenidos durante la fase. Además, al finalizar el proyecto, el advisor debe entregar un reporte final general.

Al concluir el contrato, la PYME puede calificar al advisor según su desempeño y resultados obtenidos.

Restricciones:

* Una PYME solo puede tener un contrato activo a la vez.
* Una PYME únicamente puede trabajar con un advisor simultáneamente.
* El sistema de mensajería bloquea información de contacto externa.
* Toda negociación y comunicación debe realizarse dentro de PymeBoost.


--- 

## Validaciones

En esta seccion explicamos a detalle como se hace la validacion de PYMES y advisors, todo desde el registro de la cuenta de la PYME y el advisor. 

## Validacion de Pymes

Uno de los pilares principales de PymeBoost es la seguridad, legitimidad y automatización inteligente dentro del ecosistema. Por ello las PYMES son verificadas utilizando la lista oficial del MEIC de Costa Rica para asegurar que:

- Sean negocios reales.
- Existan formalmente.
- Cumplan requisitos básicos.

### Registro PYME

Para registrarse en la plataforma, la PYME debe ingresar:

* Nombre completo de la empresa.
* Correo electrónico empresarial.
* Número telefónico.
* Cédula jurídica.
* Ubicación física (Opcional).
* Método de pago:
  * Tarjeta de crédito o débito.
  * Información de facturación.

El método de pago será utilizado para:

* Cobro de la membresía mensual de PymeBoost.
* Cobro de comisiones asociadas a contratos realizados dentro de la plataforma.

Además, la empresa deberá subir su cédula jurídica en formato PDF. La plataforma utilizará IA y procesamiento documental para escanear y validar automáticamente la información del documento.

El sistema verificará:

* Que la cédula jurídica coincida con los registros del MEIC.
* La validez y autenticidad del documento.
* La fecha de expiración de la licencia o registro de la PYME.

Una vez validada la información y confirmada la existencia de la empresa dentro de la base oficial del MEIC, la PYME quedará habilitada dentro de la plataforma.

Además, la empresa deberá completar una sección de contexto empresarial mediante una descripción libre de máximo 500 palabras donde explique:

- A qué se dedica la empresa.
- Industria o sector.
- Problemas actuales.
- Procesos que desea optimizar.
- Objetivos empresariales.
- Necesidades específicas.

Esta descripción será utilizada por el sistema de IA y matching inteligente de PymeBoost para:

- Recomendar advisors adecuados.
- Identificar posibles procesos a optimizar.
- Sugerir planes de acción.
- Relacionar la PYME con especialistas según el contexto y problema descrito.

## Validacion Advisors

Los advisors pasan por un proceso de validación apoyado por inteligencia artificial. Primero se hace un registro regular y despues se hace un analisis de su perfil en LinkedIn mas un analisis de casos de exito para mejorar el perfil del advisor.

### Registro Advisors

El proceso de registro inicial para advisors será rápido y sencillo. Para crear una cuenta, únicamente se solicitará:

- Nombre completo.
- Correo electrónico.
- Número telefónico.
- Perfil de LinkedIn.
- Documento de identidad (cédula o pasaporte).
- Método de pago:
  - Tarjeta de crédito o débito.
  - Información de facturación.

Una vez creada la cuenta, PymeBoost utilizará inteligencia artificial para enriquecer y validar automáticamente el perfil profesional del advisor. Ademas el metodo de pago es para la membresia que va a pagar el advisor por usar PymeBoost al igual que la pyme. 

La IA analizará LinkedIn y el curriculum vitae en formato PDF para extraer y verificar información como:

- Años de experiencia laboral.
- Industrias donde ha trabajado (Listado).
- Certificaciones y títulos obtenidos.
- Vigencia y fecha de certificaciones.
- Áreas de especialización según experiencia previa.

Además, el advisor podrá subir casos de éxito, proyectos anteriores o documentos profesionales en formatos como PDF, PPT o DOCX. Es importante mencionar que estos Use Cases funcionan para mejorar el perfil del advisor en un inicio.

Para facilitar este proceso, PymeBoost ofrecerá una plantilla estandarizada de “Use Cases”, donde los advisors podrán completar información estructurada como:

Company Information
* Nombre de la empresa.
* Industria.
* Tamaño de la empresa (Pequeña, Mediana, Grande)
* Cantidad de empleados.

Contexto y Problema
* Situación inicial (Maximo 200 palabras)
* Problema principal del negocio. (Maximo 200 palabras)
* Objetivos del proyecto. (Deben haber sido medibles)

Solución Implementada
* Acciones realizadas. (Listado)
* Procesos optimizados. (Listado)
* Tecnologías o estrategias utilizadas. (Listado)

Métricas y Resultados
* Ventas antes y después.
* Revenue antes y después.
* Tiempo de operación optimizado. (Va por meses)
* Reducción de costos.
* Incremento de productividad.
* Conversión de clientes.
* Retención de clientes.

Impacto del Negocio
* Porcentaje de crecimiento generado.
* KPI’s mejorados.
* Tiempo estimado para observar resultados.
* Impacto general en la operación de la empresa.

La IA procesará automáticamente esta información para clasificar la experiencia del advisor, mejorar su perfil y generar matches más precisos con las necesidades de cada PYME. Importante mencionar que esta plantilla puede ser rellanada manualmente por el advisor o la IA normaliza el documento que haya pasado donde se aplican los use cases.

Con esto, la plataforma puede:

- Generar roadmaps personalizados esto a la hora de definir los contratos preliminares en el matching.
- Recomendar procesos a optimizar.
- Estimar mejoras en métricas del negocio.
- Hacer matches más precisos entre PYMES y advisors.
- Sistema de Reputación

### Rating

Después de cada proyecto:

- Las PYMES califican al advisor.
- Se utiliza un sistema de 1 a 5 estrellas.
- Se incluyen comentarios y retroalimentación (Maximo 400 palabras)

Esto ayuda a mantener estándares de calidad y generar confianza dentro de la plataforma.

---

## Mathching 

PymeBoost contará con un sistema de matching inspirado en plataformas como Tinder, donde las PYMES podrán visualizar advisors recomendados mediante tarjetas interactivas.

Cada perfil mostrará:

- Nombre del advisor.
- Industria y especialización.
- Calificación y reputación.
- Proyecto similar realizado anteriormente (Nombre y Descripcion)
- Compatibilidad PYME–advisor (escala del 1 al 5).
- Mejora estimada en métricas de negocio.
- Distribución estimada de ganancias entre PymeBoost y el advisor con un plan estandar (1 mes)

Además, cada tarjeta incluirá dos acciones:

- Swipe Approved → aceptar recomendación.
- Swipe Rejected → descartar recomendación.

El sistema utilizará IA para generar recomendaciones basadas en proyectos previos exitosos, necesidades de la PYME y métricas históricas de impacto.

---

## Mensajería

La comunicación entre las PYMES y los advisors se realiza mediante un sistema interno de mensajería dentro de PymeBoost. Esta funcionalidad se habilita una vez que la PYME realiza un “Swipe Approved” sobre un advisor recomendado.

Cada match genera automáticamente un chat privado entre ambas partes. Una PYME puede mantener múltiples chats activos al mismo tiempo, ya que un match no garantiza la asignación del proyecto, sino la oportunidad para que el advisor presente una propuesta y participe en el proceso de selección.

A través de estos chats, ambas partes pueden discutir:

- Necesidades del negocio.
- Objetivos del proyecto.
- Alcances y expectativas.
- Estrategias de implementación.
- Tarifas.

Además, junto al chat existirá un componente de negociación (negotiate tarrif) donde la PYME podrá enviar propuestas económicas al advisor y negociar tarifas antes de formalizar un contrato.

Una vez que la PYME decide seleccionar oficialmente a un advisor, podrá utilizar el botón:

* “Marry the Prospect” → asigna el proyecto oficialmente al advisor seleccionado.

También existirá la opción:

* “Unmatch” → elimina la conexión entre ambas partes, similar al funcionamiento de Tinder.

Antes de formalizar el acuerdo, ambas partes podrán visualizar un componente de contrato predeterminado generado por PymeBoost y modificarlo segun las necesidades del proyecto.

Con el fin de mantener la transparencia y seguridad del ecosistema, no está permitido el contacto fuera de la plataforma. Toda la comunicación debe realizarse dentro de PymeBoost, evitando compartir:

- Correos electrónicos.
- Números telefónicos.
- Redes sociales.
- Otros medios externos de contacto.

Esto permite mantener un entorno más seguro, trazable y confiable tanto para las PYMES como para los advisors.

--- 

## Contratos

Una vez que la PYME y el advisor llegan a un acuerdo mediante el sistema de mensajes, se puede generar un contrato digital dentro de PymeBoost. Con la accion de "Marry The Prospect" que mencionamos anteriormente ya se puede realizar un contrato especifico con el advisor o utilizar el estandar que recomienda PymeBoost desde un inicio. 

Cada contrato incluye los siguientes campos principales:

* Presupuesto de implementación del proceso (Numero en colones)
* Retainer mensual para el advisor (Numero en colones)
* Comisión de PymeBoost equivalente al 3% del presupuesto base. (Porcentaje segun comision)
* Fecha de inicio. (Formato de fecha)
* Fecha límite. (Formato de fecha)
* Objetivos y métricas esperadas. (Objetivos medibles)
* Ganancia Advisor (Porcentaje segun comision)
* Duración del contrato (En meses)
* Plan de acción personalizado. (Plan de accion de la IA por fases)

### Objetivos y Métricas Esperadas

Cada contrato dentro de PymeBoost debe definir objetivos claros y medibles además de métricas específicas que permitan medir el impacto real del proceso implementado por el advisor.

Estas métricas funcionan como referencia para:

- Evaluar el éxito del proyecto.
- Medir mejoras del negocio.
- Calcular posibles ganancias variables del advisor.
- Dar seguimiento al progreso de la PYME.

Las métricas pueden variar dependiendo del tipo de proyecto, industria y necesidades de la empresa.

Ejemplos de métricas
* Incremento porcentual de ventas.
* Crecimiento de revenue mensual.
* Reducción de costos operativos.
* Disminución de tiempos de proceso.
* Aumento de productividad.
* Incremento en retención de clientes.
* Conversión de leads o ventas.
* Crecimiento de tráfico digital.
* Mejora de KPI’s internos.

**Ejemplo practico:**

PYME: 
* Tienda de ropa con ventas digitales bajas.

Problema identificado:
* Baja conversión de clientes en campañas publicitarias de Instagram y Facebook.

Objetivo del contrato:
* Optimizar el proceso de marketing digital y aumentar las ventas provenientes de anuncios pagados en un 25%.

Métricas definidas:

* Incrementar conversiones de campañas en un 25%.
* Reducir el costo por adquisición (CPA) en un 15%.
* Incrementar tráfico web proveniente de redes sociales en un 30%.
* Aumentar ventas digitales mensuales en un 20%.

Proceso a optimizar:

- Segmentación de anuncios.
- Embudo de conversión.
- Estrategia de contenido.
- Retargeting de clientes.
- Optimización de landing pages.

Resultados esperados:
Si las métricas definidas se cumplen dentro del periodo establecido, el advisor podrá recibir el porcentaje de ganancia acordado en el contrato según el impacto generado.

### Ganancia Advisor 

PymeBoost permitirá modelos de compensación basados en resultados, donde el advisor podrá recibir un porcentaje de las mejoras o ganancias generadas a partir del proceso implementado en la PYME, según lo establecido dentro del contrato.

Durante la negociación del contrato, ambas partes podrán definir:

* Tipo de métrica utilizada.
* Porcentaje de comisión para el advisor.
* Tiempo de evaluación posterior a la implementación.
* Límite de duración de las comisiones.
* Método de validación de resultados.

Por ejemplo, una PYME y un advisor podrían acordar:

* 5% de las ventas adicionales generadas.
* Durante 1 mes posteriores a la implementación.
* Comparando ventas antes y después del proceso optimizado.

El cálculo se realizará utilizando métricas previamente definidas dentro del contrato, como:

* Incremento de ventas.
* Reducción de costos.
* Aumento de productividad.
* Crecimiento de revenue.
* Mejora de KPI’s del negocio.

Una vez el contrato principal finaliza, PymeBoost mantiene una etapa de seguimiento de resultados donde la plataforma continúa monitoreando las métricas acordadas durante el periodo definido en el contrato.

Por ejemplo:

* Ventas promedio antes del proceso:

  * $8,000 mensuales.

* Ventas promedio 1 mes después:

  * $12,000 mensuales.

* Incremento generado:

  * $4,000.

* Comisión acordada para el advisor:

  * 5%.

* Pago correspondiente:

  * $200.

La plataforma calcula automáticamente estos resultados utilizando las métricas registradas por la PYME, esto según las condiciones definidas en el contrato.

De esta manera, el advisor obtiene beneficios directamente relacionados con el impacto real generado en la empresa y la PYME únicamente paga una comisión basada en resultados verificables.


### Duración de contratos

PymeBoost maneja diferentes gamas de contrato:

- Gama estándar: 1 mes → comisión inicial del 3%.
- Gama media: 3 meses → comisión del 5%.
- Gama alta: 6 meses → comisión del 7%.
- Gama personalizada: contratos ajustables según las necesidades de la empresa.

En los contratos personalizados, la comisión sigue un patrón incremental:

* Se inicia en 3%.
* Aumenta un 1% por cada mes adicional del contrato.
* Retainer del advisor

Basicamente el advisor recibe un retainer mensual durante el tiempo que dure el contrato, funcionando como una compensación periódica por acompañamiento, implementación y seguimiento del proceso.


### Plan de acción 

Uno de los elementos principales del contrato es el plan de acción personalizado para seguimiento de la PYME y PymeBoost.

Este plan es generado inicialmente mediante un agente de IA de PymeBoost, el cual analiza:

- Contexto de la PYME (descripción de la empresa, máximo 300 palabras).
- Industria.
- Objetivos y métricas esperadas.
- Problema identificado.
- Tipo de proceso a implementar.

Con base en esto, la plataforma genera un plan de acción mínimo de 5 pasos estratégicos. Posteriormente:

- El advisor puede modificarlo.
- La PYME puede personalizarlo.
- Ambas partes pueden adaptarlo conforme avance el proyecto.

**Ejemplo de Plan de Acción:**

Caso:
* PYME de ropa con baja conversión en campañas publicitarias de Instagram y Facebook.

Objetivo:
* Aumentar ventas digitales y optimizar campañas de marketing.

Plan de acción generado por IA:
* Analizar métricas actuales de campañas y comportamiento de clientes.
* Optimizar segmentación de anuncios según público objetivo.
* Rediseñar landing pages para mejorar conversión.
* Implementar estrategia de retargeting para clientes potenciales.
* Medir resultados semanalmente y ajustar campañas según KPI’s definidos.

Este plan sirve como guía inicial para el desarrollo del proyecto y seguimiento de resultados dentro de la plataforma.

--- 

## Dashboard de Seguimiento 

A diferencia de otras plataformas donde únicamente se conecta a ambas partes y luego el proceso queda sin supervisión, PymeBoost realiza un seguimiento continuo del contrato y de las fases definidas dentro del plan de acción. Basicamente PymeBoost incorpora un dashboard inteligente donde tanto la PYME como el advisor pueden monitorear en tiempo real el estado del proyecto, el avance del plan de acción y el cumplimiento de objetivos definidos dentro del contrato.

El dashboard se genera directamente a partir de:

* Objetivos y métricas definidas en el contrato.
* Fases del plan de acción personalizado.
* Entregables acordados.
* KPI’s establecidos para medir impacto.
* Fechas límite del proyecto.

### Informacion del Dashboard

* Estado del contrato:

  * Activo
  * Cancelado
  * Por Calificar
  * Completado

* Porcentaje de avance del proyecto:

  * Calculado automaticamente segun las fases completadas.

* Fases activas y completadas:

  * Objetivos cumplidos.
  * Objetivos pendientes.
  * Reportes del advisor.
  * Evidencia del progreso.

* Objetivos alcanzados:

  * Seguimiento de metas cumplidas durante y despues del proyecto.

* Metricas de rendimiento:

  * KPIs
  * Conversion
  * Productividad
  * Ventas
  * Retencion
  * ROI

* Tiempo restante del contrato:

  * Tiempo faltante para finalizar el proyecto (meses y dias)

* Cumplimiento de reportes:

  * Validacion de entregables y reportes definidos en el contrato.

Esto permite que tanto la PYME como el advisor tengan un seguimiento claro, estructurado y transparente del progreso del proyecto y de los resultados obtenidos.

### Ejemplo de Dashboard

Caso: PYME de ropa que busca optimizar su proceso de marketing digital y aumentar ventas provenientes de campañas publicitarias.

Advisor Seleccionado: Especialista en Marketing Digital y Performance Ads.

**Estado General del Proyecto**

| Indicador           | Estado          |
| ------------------- | --------------- |
| Estado del contrato | Activo          |
| Duración            | 3 meses         |
| Avance del proyecto | 60% completado  |
| Tiempo restante     | 1 mes y 12 días |


#### Fases del Plan de Acción

Fase 1 — Análisis Inicial *(Completada)*

Objetivos Cumplidos

* Auditoría de campañas actuales.
* Identificación de público objetivo.
* Análisis de métricas históricas.

Reporte del Advisor

Se detectó mala segmentación en campañas y baja optimización de conversiones.

Fase 2 — Optimización de Campañas *(Completada)*

Objetivos Cumplidos

* Nueva segmentación implementada.
* Rediseño de anuncios.
* Configuración de retargeting.

Reporte del Advisor

Se optimizaron campañas enfocadas en clientes recurrentes y audiencias similares.

Fase 3 — Optimización de Landing Pages *(Activa)*

Objetivos Pendientes

* Mejorar velocidad del sitio.
* Optimizar formularios de compra.
* Simplificar proceso de checkout.

Reporte Parcial

Se realizaron pruebas A/B en páginas de productos principales.


**Objetivos del Proyecto**

Objetivo General
* Optimizar el proceso de marketing digital y aumentar las ventas provenientes de anuncios pagados.

Objetivos Específicos

* Incremento de tráfico web desde redes sociales.
* Mayor interacción en campañas.
* Mejora inicial en conversiones digitales.


**Métricas de Rendimiento**

| Métrica                          | Antes | Después |
| -------------------------------- | ----- | ------- |
| Conversiones                     | 2.1%  | 3.4%    |
| CPA                              | $14   | $10     |
| Tráfico desde Instagram/Facebook | —     | +28%    |
| Ventas digitales mensuales       | —     | +16%    |


**Cumplimiento de Reportes**

Entregables Completados

* Reporte de auditoría inicial.
* Reporte de campañas optimizadas.
* Reporte de segmentación de clientes.

Entregables Pendientes

* Reporte final de resultados.
* Análisis de ROI del proyecto.

Gracias al seguimiento continuo, PymeBoost permite que las PYMES no solo reciban asesoría, sino que también puedan validar el impacto real de la implementación mediante métricas, reportes y objetivos claramente definidos.

### Reportes 

PymeBoost ofrece una plantilla simple de reportes para cada fase del proyecto. Al finalizar una fase, el advisor debe completar un pequeño reporte dentro de la plataforma como entregable oficial.

El advisor puede:

* Completar manualmente la plantilla de reporte dentro de la plataforma.
* Adjuntar un PDF de reporte realizado externamente.

En caso de adjuntar un PDF, PymeBoost utilizará IA y procesamiento documental para analizar el documento y completar automáticamente la plantilla de reporte dentro del sistema.

Cada reporte incluye:

* Nombre de la fase.
* Estado de la fase:
  * Activa
  * Completada
* Descripción de acciones realizadas. (Máximo 200 palabras)
* Objetivos cumplidos. (Listado de tres mini objetivos con métricas cumplidas)
* Resultados obtenidos. (Opcional en caso de existir resultados en esa fase)
* Observaciones adicionales. (Máximo 200 palabras)

Estos reportes funcionan como evidencia del progreso del proyecto y son visibles tanto para la PYME como para el advisor dentro del dashboard.

Además, al finalizar el contrato, el advisor debe entregar un reporte final general con:

* Resumen completo del proyecto.
* Resultados finales.
* Métricas obtenidas.
* Recomendaciones futuras.


--- 

## Modelo de Negocio y Generación de Ingresos

PymeBoost genera ingresos mediante dos fuentes principales dentro de su ecosistema. La primera corresponde a las comisiones aplicadas sobre los contratos realizados dentro de la plataforma, las cuales ya fueron mencionadas anteriormente y varían según la duración y tipo de contrato. Estas comisiones permiten sostener el sistema de seguimiento, validación, seguridad y acompañamiento continuo que ofrece la plataforma.

La segunda fuente de ingresos proviene de un sistema de membresías mensuales tanto para las PYMES como para los advisors registrados.

**Plan para PYMES**

Las PYMES deben pagar una membresía mensual de 25 dólares, la cual les permite:

- Acceder a la plataforma.
- Buscar y contactar advisors.
- Generar contratos.
- Utilizar herramientas de seguimiento.
- Obtener recomendaciones inteligentes mediante IA.
- Acceder a reportes y dashboards de rendimiento.

Los advisors registrados pagan una membresía mensual de 15 dólares, la cual les permite:

- Mantener un perfil profesional dentro de la plataforma.
- Ser recomendados a PYMES según su especialidad.
- Gestionar contratos y pagos.
- Acceder al sistema de reputación y validación.

Este modelo híbrido de membresías y comisiones permite que PymeBoost mantenga un ecosistema sostenible, donde tanto las empresas como los advisors reciben herramientas, seguridad y acompañamiento continuo durante todo el proceso de colaboración.

---

## Authors

* Isaac Villalobos Bonilla, 2024124285
* Christopher Daniel Vargas Villalta, 2024108443
* Santiago Espinoza Rendón, 2024156530
* Jose Ignacio Paniagua Vargas, 2024163735

--- 

# Prototipos

Prototipo Figma: 

---

# Frontend

## 1.1 Technology Stack 

| Technology                    | Version             | Purpose                               | Justification                                                                                                                            |
| ----------------------------- | ------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| React                         | 19.1.0              | Main UI library                       | Enables the development of dynamic and reusable interfaces for dashboards, chats, and interactive systems within PymeBoost.              |
| Next.js                       | 15.3.3              | Main frontend framework               | Provides routing, hybrid rendering, and a modern architecture compatible with cloud deployments and enterprise APIs.                     |
| TypeScript                    | 5.8.3               | Main frontend language                | Improves maintainability, scalability, and reliability through strong typing and integration with the backend OpenAPI 3.1 specification. |
| Node.js                       | 22.15.0 LTS         | Development runtime                   | Used for builds, tooling, and automation within the frontend ecosystem.                                                                  |
| TailwindCSS                   | 4.1.8               | Utility-first CSS framework           | Enables rapid development of modern, responsive, and consistent interfaces for dashboards and SaaS systems.                              |
| Zustand                       | 5.0.5               | Global state management               | Simplifies management of global states such as authentication, chats, and notifications in a lightweight and scalable way.               |
| TanStack Query                | 5.76.1              | Server state management and caching   | Synchronizes backend data, manages caching, and automatically updates information from APIs.                                             |
| Auth0                         | 3.1.1               | Authentication and session management | Provides secure authentication and centralized user management integrated with the backend authentication system with JWT validation.    |
| Framer Motion                 | 12.15.0             | Animation and transition system       | Enables modern animations and interactive transitions to improve the platform user experience.                                           |
| ESLint                        | 9.18.0              | Static code analysis                  | Detects errors, enforces development conventions, and improves overall frontend code quality.                                            |
| Prettier                      | 3.3.3               | Automatic code formatting             | Maintains visual consistency and code standardization across the project and shared monorepo.                                            |
| React Hook Form               | 7.57.0              | Form management and validation        | Efficiently manages complex forms and input handling with minimal re-renders; integrates seamlessly with Zod validation schemas.         |
| Zod                           | 3.23.8              | Data validation and typing            | Provides typed validation and data consistency before sending information to the backend; runtime schema validation for API DTOs.       |
| Vitest                        | 2.1.8               | Unit and integration testing          | Fast, ESM-native test framework integrated with Vite; enables rapid testing for components, hooks, and utilities.                        |
| Playwright                    | 1.58.2              | End-to-end testing                    | Automates testing for critical flows such as authentication, dashboards, and contracts within the platform across multiple browsers.     |
| Radix UI                      | Latest Stable (13.x)| Accessible component primitives       | Provides unstyled, accessible component foundational elements (Dialog, Select, Tooltip, etc.) for building accessible interfaces.       |
| @radix-ui/react-dialog        | Latest Stable (13.x)| Accessible dialog component           | Foundation for modals, alerts, and forms with full keyboard navigation and screen reader support (WCAG 2.1 AA).                       |
| Fetch API                     | Browser Native      | HTTP client for API communication     | Native browser API used via TanStack Query for making requests to backend REST APIs; no external dependency required.                   |
| Vercel                        | Latest Stable       | Frontend hosting and deployment       | Enables deployment of Next.js applications with native SSR/CSR support, preview deployments, and automatic optimization.                |
| GitHub Actions                | Latest Stable       | CI/CD and automation                  | Automates testing, builds, and deployments within the shared monorepo environment with GitHub Environments.                             |
| GitHub Environments           | Latest Stable       | Environment management                | Supports secure and organized management of Development, Stage, and Production environments with secrets and deployment approvals.      |
| Google Cloud Platform         | Latest Stable       | Main cloud platform service           | Provides integration with backend services (Cloud Run, Cloud SQL) and serves as primary cloud infrastructure.                            |
| Google Cloud Operations Suite | Latest Stable       | Backend observability and monitoring  | Cloud Logging, Cloud Monitoring, Cloud Trace for backend services, infrastructure metrics, and distributed tracing.                      |
| Sentry                        | 8.x                 | Frontend error tracking and monitoring| Real-time error capture, source map integration, user session tracking, and performance monitoring specific to client-side errors.      |
| Client-Side Rendering (CSR)   | Next.js 15          | Frontend rendering strategy           | Enables dynamic and highly interactive user experiences directly in the browser for dashboards, chats, matching systems, and real-time interactions. |
| Feature-Based Architecture    | Custom Architecture | Modular frontend organization         | Supports scalability and separation of functionalities such as dashboards, matching, contracts, and messaging without technical coupling. |
| Monorepo Architecture         | GitHub Monorepo     | Shared frontend/backend repository    | Centralizes workflows, CI/CD pipelines, and collaboration between frontend and backend teams with unified version control.              |
| Development / Stage / Production Environments | Standard Environment Strategy | Environment separation | Allows independent configuration and deployment workflows for development, testing, and production stages of the platform. |

---

## 1.2 Feature-Based Architecture & Folder Structure

PymeBoost frontend follows a **feature-based architecture** where the application is organized by business domains and features rather than technical layers. Each feature is self-contained with its own components, hooks, services, and state management, improving scalability and team autonomy.

The architecture supports:

- Feature ownership: each team can develop, test, and deploy features independently.
- Reduced cross-feature dependencies: features interact only through well-defined interfaces.
- Clear responsibility boundaries: each feature knows its own logic, data, and UI.
- Scalable module growth: new features added without affecting existing ones.
- Simplified testing: feature-specific tests remain isolated.

### Core Features

PymeBoost is built around these core features:

- **Matching:** Advisor discovery, recommendations, swipe decisions, match creation.
- **Contracts:** Contract negotiation, proposal submission, acceptance, tracking.
- **Messaging:** Real-time chat between PYME and advisors, message history.
- **Dashboard:** Project overview, metrics, milestones, status tracking.
- **Reports:** Report generation, viewing, download, sharing.
- **Auth:** User authentication, login, logout, session management.

### Complete Folder Structure

Each feature is a complete, self-contained module with its own layers:

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── (auth)/
│       ├── login/
│       │   └── page.tsx
│       └── callback/
│           └── page.tsx
│
├── features/
│   ├── matching/
│   │   ├── components/
│   │   │   ├── MatchingCard.tsx
│   │   │   ├── MatchingGrid.tsx
│   │   │   └── MatchingFilters.tsx
│   │   ├── hooks/
│   │   │   └── useAdvisorMatching.ts
│   │   ├── services/
│   │   │   └── matchingService.ts
│   │   ├── types/
│   │   │   └── matching.ts
│   │   ├── validators/
│   │   │   └── matchingValidator.ts
│   │   └── page.tsx
│   │
│   ├── contracts/
│   │   ├── components/
│   │   │   ├── ContractViewer.tsx
│   │   │   ├── ContractNegotiation.tsx
│   │   │   └── ContractTerms.tsx
│   │   ├── hooks/
│   │   │   └── useContractNegotiation.ts
│   │   ├── services/
│   │   │   └── contractService.ts
│   │   ├── types/
│   │   │   └── contract.ts
│   │   ├── validators/
│   │   │   └── contractValidator.ts
│   │   └── page.tsx
│   │
│   ├── messaging/
│   │   ├── components/
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── MessageInput.tsx
│   │   ├── hooks/
│   │   │   └── useChat.ts
│   │   ├── services/
│   │   │   └── chatService.ts
│   │   ├── types/
│   │   │   └── chat.ts
│   │   ├── validators/
│   │   │   └── chatValidator.ts
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── ProjectTimeline.tsx
│   │   │   └── PerformanceMetrics.tsx
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   ├── services/
│   │   │   └── dashboardService.ts
│   │   ├── types/
│   │   │   └── dashboard.ts
│   │   ├── validators/
│   │   │   └── dashboardValidator.ts
│   │   └── page.tsx
│   │
│   ├── reports/
│   │   ├── components/
│   │   │   ├── ReportViewer.tsx
│   │   │   └── ReportGenerator.tsx
│   │   ├── hooks/
│   │   │   └── useReports.ts
│   │   ├── services/
│   │   │   └── reportService.ts
│   │   ├── types/
│   │   │   └── report.ts
│   │   └── page.tsx
│   │
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   └── LogoutButton.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       ├── services/
│       │   └── authService.ts
│       ├── types/
│       │   └── auth.ts
│       └── page.tsx
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Dialog.tsx
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   └── Navigation.tsx
│   ├── hooks/
│   │   └── useNotifications.ts
│   ├── types/
│   │   └── common.ts
│   └── utils/
│       └── helpers.ts
│
├── store/
│   ├── authStore.ts
│   ├── notificationStore.ts
│   └── uiStore.ts
│
├── lib/
│   ├── queryClient.ts
│   └── axios.ts
│
├── tests/
│   ├── features/
│   │   ├── matching.spec.ts
│   │   ├── contracts.spec.ts
│   │   ├── messaging.spec.ts
│   │   └── auth.spec.ts
│   └── shared/
│       ├── Button.spec.ts
│       └── helpers.spec.ts
│
├── styles/
│   ├── globals.css
│   └── variables.css
│
└── public/
    ├── logo.png
    └── icons/
```

### Folder Responsibilities
 
| Folder | Responsibility |
|--------|----------------|
| `app/` | Next.js App Router pages and route structure. Contains layout.tsx for root layout and route-based pages. |
| `features/matching/` | Advisor discovery and matching logic. Components for cards, grids, and filters. |
| `features/contracts/` | Contract lifecycle management. Components for viewing, negotiating, and tracking contracts. |
| `features/messaging/` | Real-time chat between PYME and advisors. Components for chat panel, message list, and input. |
| `features/dashboard/` | Project overview and metrics. Components for stats, timelines, and performance tracking. |
| `features/reports/` | Report generation and viewing. Components for report viewer and generator. |
| `features/auth/` | User authentication and session management. Components for login and logout. |
| `features/[feature]/components/` | UI components specific to that feature. Used only within that feature. |
| `features/[feature]/hooks/` | Business logic hooks that implement workflows. Called by components. |
| `features/[feature]/services/` | API communication functions. Called by hooks. One service per feature. |
| `features/[feature]/types/` | TypeScript interfaces specific to the feature. |
| `features/[feature]/validators/` | Zod validation schemas for feature data. |
| `features/[feature]/page.tsx` | Route page component for that feature. |
| `shared/components/` | Reusable UI components used across multiple features. |
| `shared/components/ui/` | Basic UI primitives (Button, Input, Badge, Modal, Card, Dialog, etc.). |
| `shared/components/layouts/` | Layout wrappers shared across features (DashboardLayout, AuthLayout). |
| `shared/hooks/` | Common hooks reused across features (useNotifications, etc.). |
| `shared/types/` | Global TypeScript types used across all features. |
| `shared/utils/` | Utility functions and helpers. |
| `store/` | Zustand global state stores. Not feature-specific. |
| `store/authStore.ts` | User authentication, permissions, JWT token. |
| `store/notificationStore.ts` | Toast messages, alerts, notifications. |
| `store/uiStore.ts` | Modal states, sidebars, theme. |
| `lib/` | Configurations and third-party integrations (queryClient for TanStack Query, axios for HTTP). |
| `tests/` | Feature and component tests using Playwright and Jest. Organized by feature. |
| `styles/` | Global CSS and CSS variables. |
| `public/` | Static assets (logos, icons, images). |
 
### Naming Conventions
 
**Components:**
- PascalCase: `MatchingCard.tsx`, `ContractViewer.tsx`, `DashboardStats.tsx`
- Descriptive names matching functionality.
**Hooks:**
- camelCase with `use` prefix: `useAdvisorMatching.ts`, `useChat.ts`, `useDashboard.ts`
- Function name describes the hook's purpose.
**Services:**
- camelCase with `Service` suffix: `matchingService.ts`, `contractService.ts`, `chatService.ts`
- One service file per feature.
**Types/Interfaces:**
- PascalCase: `Advisor.ts`, `Contract.ts`, `Message.ts`
- File name matches the main interface it exports.
**Validators:**
- camelCase with `Validator` suffix: `matchingValidator.ts`, `contractValidator.ts`
- Contains Zod schemas for validation.
**Stores:**
- camelCase with `Store` suffix: `authStore.ts`, `notificationStore.ts`, `uiStore.ts`


### Feature Internal Structure

Each feature follows this internal layer pattern:

- **components/:** UI components specific to the feature. Used only within that feature.
- **hooks/:** Business logic hooks that implement workflows. Called by components.
- **services/:** API communication functions. Called by hooks. One service per feature.
- **types/:** TypeScript interfaces and types specific to the feature.
- **validators/:** Zod schemas for validating feature data.
- **[FeatureName]Page.tsx:** Main page component for the feature route.

### Shared Layer

Shared resources live in `src/shared/` and are reused across features:

- **components/ui/:** Basic reusable UI elements (Button, Input, Badge, Modal, etc.).
- **components/layouts/:** Layout wrappers shared across features.
- **hooks/:** Common hooks like useNotifications.
- **types/:** Global TypeScript types used across features.
- **utils/:** Helper functions and utilities.

### Global State Management

Global state (not feature-specific) lives in `src/store/`:

- **authStore.ts:** User authentication, permissions, JWT token.
- **notificationStore.ts:** Toast messages, alerts, notifications.
- **uiStore.ts:** Modal states, sidebars, theme.

Features can read from these stores but should not modify them directly. State updates go through custom hooks.

### Feature Communication

Features communicate through:

- **Shared stores:** Features read from authStore to check permissions or user info.
- **Shared types:** Features import type definitions from shared/types/ for common data structures.
- **API responses:** Features get data from backend APIs, not from other features directly.

Features do NOT import from each other's folders. If feature A needs functionality from feature B, that logic belongs in the shared layer or backend API.

### Routing Structure

Each feature has its own route in `src/app/`:

- `/dashboard` → features/dashboard/DashboardPage.tsx
- `/matching` → features/matching/MatchingPage.tsx
- `/contracts` → features/contracts/ContractsPage.tsx
- `/messaging` → features/messaging/MessagingPage.tsx
- `/reports` → features/reports/ReportsPage.tsx
- `/auth` → features/auth/AuthPage.tsx

### Key Rules
 
- Each feature is independent: its own components, hooks, services, types, validators.
- Features never import from other features' folders. Use shared/ or the backend API instead.
- Shared components and utilities go in `shared/`.
- Global app state (auth, notifications, UI) goes in `store/`.
- Each feature service handles only that feature's API calls.
- Hooks handle business logic and coordinate between components and services.
- Components handle only UI rendering and user event delegation.
- All API responses are validated with Zod before use.
- Tests are colocated with features in `tests/features/`.

## 1.3 Project Scaffold & Folder Structure

## 1.4 Component System & UI Architecture

## 1.5 Visual Design System & Branding

## 1.6 Design Patterns & Engineering Standards

## 1.7  State Management & API Communication

## 1.8 Workflows & Interaction Flows

## 1.9 Authentication, Security & Session Management

## 1.10 Testing, Observability & CI/CD

## 1.11 Performance Optimization Strategy

## 1.12 C4 Diagrams




---

# Backend

## Technology Stack

- API type: REST API, HTTPS
- API standard: OpenAPI 3.1
- API gateway: Google Cloud API Gateway
- Hosting: Google Cloud Run
- Architecture: Monorepo with Domain-Driven Design (DDD) and Event Driven Design
- Coding language: Python 3.12
- Web framework: FastAPI 0.115
- Unit testing framework: Pytest 8.3
- Data validation framework: Pydantic 2.7
- Asynchronous operations & notifications: Google Cloud Pub/Sub and Google Cloud Tasks
- Document & file storage: Google Cloud Storage
- OCR processing: Google Cloud Document AI
- Secret management: Google Secret Manager
- Code repository: GitHub (monorepo shared with the frontend)
- CI/CD automation: GitHub Actions
- Environments: Development, Stage, Production
- Environment deployments: GitHub Environments
- Observability: Google Cloud Operations Suite (Cloud Logging + Cloud Monitoring)
- Authentication verification: Auth0 (JWT token validation with syncrony from the frontend)
- Service architecture: Domain-driven services, Event Driven Design, Monorepo
- Database: Google Cloud SQL (PostgreSQL 16)
- Encryption key management: Google Cloud KMS
- Session cache: Google Cloud Memorystore (Redis)
- Agent orchestration framework: LangGraph (LangChain) 0.2

---

## Security

### Authentication & Authorization
- Authentication delegated to Auth0 with Google OAuth 
- JWT tokens validated on every request; expiration: 1 hour, automatic rotation with refresh token
- Roles and permissions validated at the backend level: `Manager` and `Customs Agent` with the same permission codes defined in the frontend
- Per-endpoint authorization enforced using permission claims from the JWT payload

### Transport
- All communication between backend services and GCP managed services (Cloud SQL, Storage, Pub/Sub) is secured via HTTPS/TLS 1.3 using Google-managed certificates

### Encryption at Rest
- The Encryption algorithm will use AES-256 to storage sensitive content in google cloud sql.
- Encryption keys are managed through Google Cloud KMS (Customer-Managed Encryption Keys - CMEK).
- Encryption is handled transparently by the cloud provider; no application-level encryption of the database is performed.

### Secrets
- All secrets managed in Google Secret Manager; never stored in the repository or hardcoded as environment variables.
 
 ### API Surface
- General maximum payload size: 10 MB; exception on the document upload endpoint: 50 MB
- Rate limit: maximum 100 concurrent requests per user
- Input validation with Pydantic on all endpoints
- OWASP API Top 10 protections applied

### Network
- Backend deployed within a private Virtual Private Cloud on Google Cloud Platform.
- Google Cloud SQL configured with no public IP, accessible only within the VPC
- Google Cloud Armor configured as firewall for the API Gateway

---

## Observability

### Logs
* Format: Structured JSON with trace_id, request_id, user_id, user_role, timestamp, level, message, service, enviroment, version, endpoint, method, statuscode
* Destination: Google Cloud Logging (same as frontend)
* Correlation: X-Trace-ID header propagated across all requests (unified with frontend logs)

### Metrics
* What to measure: Latency (P95, P99), error rate, CPU utilization, memory usage, Pub/Sub queue depth
* Destination: Google Cloud Monitoring
* Tool: Google Cloud Monitoring dashboards
 
### Distributed Traces
* Instrumentation: OpenTelemetry SDK for Python (FastAPI)
* Destination: Google Cloud Trace
* Scope: Trace every HTTP request from entry to exit, including Cloud SQL queries and Pub/Sub messages
 
### Application Patterns
 
* Health Checks: /health/live (liveness), /health/ready (readiness) endpoints checked every 30 seconds by Cloud Run
* Correlation IDs: X-Trace-ID injected into all logs, metrics, and spans; same ID across Frontend and Backend
* Service Level Indcators: 
  - Availability: 99.9% (max 43 min downtime/month)
  - Latency: 95% of requests < 500ms
  - Error rate: < 0.5%
 
### Events to Register
 
* User login (success/failure), JWT validation failures, unauthorized access attempts
* DUA created/updated/validated, document uploaded, OCR processing (started/completed), DUA generation completed
* API requests (received/completed), database queries, Pub/Sub messages (enqueued/processed)
* Exceptions/errors, health check results, performance degradation
 
### Centralization
 
* Events Platform: Google Cloud Operations Suite (Cloud Logging + Cloud Monitoring + Cloud Trace)
* Log Storage: Cloud Logging (structured logs retained 1 year; audit logs follow the retention schedule: Year 1 hot storage, Year 2 cool storage, Year 3+ archive, purged after 5 years via Cloud Scheduler)
* Dashboard Tool: Google Cloud Monitoring Dashboards 
* Frontend Synchronization: Same X-Trace-ID and Cloud Logging workspace for full-stack tracing

---

## Infrastructure  (DevOps)

### CI/CD Tool
* GitHub Actions: Automates build, test, and deployment from code repository
* Trigger: Automatic on push to develop (Dev) and main (Staging → Prod)
 
### Deployment Tool
* Terraform: Infrastructure as Code for Google Cloud resources (Cloud Run, Cloud SQL, Cloud Storage, Secret Manager)
* Environments: 
  - Dev: Cloud Run with 1 minimum instances (automatic deploy)
  - Staging: Cloud Run with 2 minimum instances (automatic deploy)
  - Prod: Cloud Run with auto-scaling from 1 to 10 instances (manual approval required, blue-green deployment). We intentionally keep the maximum number of instances low to optimize costs. At this stage of the project, we do not expect traffic levels that would require more than 10 instances. Based on our estimates, a single instance can handle approximately 5–20 requests per second, making a limit of 10 instances sufficient—and likely conservative—for the expected user base during the first year.

### Container Registry
* Google Artifact Registry: Store Docker images with automatic vulnerability scanning and binary authorization (approval)

---

## Availability

### SLA (Service Level Agreement) Target For The Business
* 99.9% uptime: Maximum 8.7 hours downtime per year
* Applies to production environment only

### Component SLAs & Recovery From the Providers

| Component | Native SLA | Recovery Strategy |
|-----------|-----------|-------------------|
| **Google Cloud Run** | 99.95% | Multi-region deployment (us-central1 + us-west1); auto-failover < 1 min |
| **Google Cloud SQL** | 99.99% (HA) | Cloud SQL HA with automatic failover and automated backups; RTO < 30 sec |
| **Google Cloud Storage** | 99.99% | Geo-redundant storage; automatic failover to secondary region |
| **Google Secret Manager** | 99.99% | Geo-replicated; retry with backoff on transient failures |
| **Google Cloud API Gateway** | 99.95% | Premium tier; circuit breaker for backend failures |
| **Google Cloud Pub/Sub** | 99.99% | Dead Letter Policy for failed messages; exponential backoff retry |
| **Google Cloud Document AI** | 99.9% | Retry with exponential backoff; degraded mode returns partial data |
| **Google Vertex AI (Gemini)** | 99.9% | Circuit breaker on 3 consecutive failures; fallback to manual review flag |
| **Auth0** | 99.99% | Managed HA by Auth0; JWT cache allows short-term offline tolerance |
| **Google Cloud Logging** | 99.95% | Best-effort; non-critical for availability |

### Single Point of Failure Analysis

### Resilience Patterns (Production)

---

## Scalability

### Elements That Scale with Request Volume
 
* Cloud Run: Auto-scale 5-50 instances (trigger: CPU > 70% or request concurrency > 80)
* Cloud SQL: Vertical scaling; read replicas for read-heavy workloads
* Pub/Sub: Auto-scales throughput; subscriber concurrency auto-adjusts (max 1000 concurrent pulls per subscription)
* Background Workers (Cloud Tasks): Auto-scale job processing threads based on queue depth
* Cloud Memorystore (Redis): Vertical scaling (Basic < Standard < Premium); auto-failover in Standard+ tiers
* Cloud Storage: Auto-scales (unlimited capacity, unlimited throughput)
 
### Auto-Scaling Triggers
 
* CPU > 70% → add Cloud Run instance
* Request concurrency > 80 → add Cloud Run instance
* Pub/Sub queue depth > 100 messages → increase subscriber concurrency
* Cloud SQL CPU > 80% → scale up (vertical); add read replica if reads spike
* Max limit: 50 Cloud Run instances (cost control)
 
 ---

## Backend Key Workflows



### User Domain

#### Create Account (SME)

Implementation: [src/backend/domains/user/controllers/create_sme_account_controller.py](src/backend/domains/user/controllers/create_sme_account_controller.py)

1. The user completes the registration form on the frontend.
2. The frontend sends the information to Google Cloud API Gateway through a POST request.
3. Google Cloud API Gateway validates that the endpoint exists and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the format of the received data.
6. Business validations are executed:
   - Email is not already registered.
   - Phone number is not already registered.
   - Valid company name.
   - Required fields are completed (Legal Entity ID, associated bank account).
7. The request data is mapped into the corresponding Domain-Driven Design DTO.
8. The user is created in Auth0 and the JWT access token is retrieved.
9. The SME profile is created in the database.
10. A `SmeAccountCreated` event is generated.
11. The system returns a successful account creation confirmation.

---

#### Create Account (Advisor)

Implementation: [src/backend/domains/user/controllers/create_advisor_account_controller.py](src/backend/domains/user/controllers/create_advisor_account_controller.py)

1. The advisor completes the registration form.
2. The frontend sends the information through a POST request to Google Cloud API Gateway.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. The request is routed to Cloud Run.
5. FastAPI validates the structure of the received data.
6. Business validations are executed:
   - Unique email address.
   - Valid specialization.
   - Required profile information is provided.
7. The request data is mapped into the corresponding Domain-Driven Design DTO.
8. The user is created in Auth0 and the JWT access token is retrieved.
9. The Advisor profile is created in the database.
10. An `AdvisorAccountCreated` event is generated.
11. The system returns a successful registration confirmation.

---

#### Login

Implementation: [src/backend/domains/user/controllers/login_controller.py](src/backend/domains/user/controllers/login_controller.py)

1. The user sends credentials from the frontend to Auth0.
2. The frontend sends the JWT to the backend using Bearer authentication.
3. Google Cloud API Gateway validates the endpoint and applies rate limiting.
4. Google Cloud API Gateway routes the request to Cloud Run.
5. FastAPI validates the JWT using Auth0 JWKS.
6. If the token is valid, the JWT claims are mapped into the corresponding domain session DTO.
7. The `Session Cache` workflow is executed.
8. The authenticated session is returned.

---

#### Session Cache

Implementation: [src/backend/domains/user/services/session_cache_service.py](src/backend/domains/user/services/session_cache_service.py)

1. An authenticated user accesses the system.
2. FastAPI retrieves information from the validated JWT.
3. The system checks whether the session already exists in Redis.
4. If the session exists:
   - The cached session is reused.
5. If the session does not exist:
   - User information is retrieved from the database using the Auth0 ID.
   - A session object is created.
   - The session is stored in Redis.
6. The session becomes available for future requests.
7. The session TTL (Time To Live) is refreshed whenever user activity is detected.

---

#### Change Information About an SME

Implementation: [src/backend/domains/user/controllers/update_sme_profile_controller.py](src/backend/domains/user/controllers/update_sme_profile_controller.py)

1. The SME requests an update to its business information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. Cloud Run receives the request.
5. FastAPI validates the user's identity.
6. The system verifies that the user owns the SME profile.
7. The SME entity is retrieved from the database.
8. Allowed fields are updated:
   - Profile picture.
   - Business name.
   - Description.
   - Contact information.
9. Changes are persisted.
10. A `SmeInformationUpdated` event is generated.
11. The updated information is returned.

---

#### Change Information About an Advisor

Implementation: [src/backend/domains/user/controllers/update_advisor_profile_controller.py](src/backend/domains/user/controllers/update_advisor_profile_controller.py)

1. The advisor requests an update to their professional information.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. Cloud Run receives the request.
5. FastAPI validates the JWT.
6. The system verifies profile ownership.
7. The Advisor entity is retrieved.
8. Allowed fields are updated:
   - Profile picture.
   - Display name.
   - Description.
   - Contact information.
9. Changes are persisted.
10. An `AdvisorInformationUpdated` event is generated.
11. The updated profile is returned.

---

#### Change Industry for an Advisor

Implementation: [src/backend/domains/user/controllers/update_advisor_industry_controller.py](src/backend/domains/user/controllers/update_advisor_industry_controller.py)

1. The advisor selects new specialization industries.
2. The frontend sends an authenticated PUT request.
3. Google Cloud API Gateway validates the endpoint and JWT.
4. The request is routed to Cloud Run.
5. FastAPI validates the user's identity through Auth0.
6. The Advisor profile is retrieved.
7. The selected industries are validated against the system catalog.
8. The advisor's associated industries are updated.
9. An `AdvisorIndustryUpdated` event is generated.
10. The system returns a successful update confirmation.


### Notifications Domain Workflows

#### Project Status Notifications
#### Messages Notifications
#### Advisor Selection Notifications


### Pyme Domain Workflows

#### Advisor Recommendation
#### Advisor Recommendation Recalculation (Triggered by AdvisorIndustryUpdated Event)
#### Advisor Similar Project Retrieval
#### Advisor Impact Prediction


### Advisor Domain Workflows

#### Advisor Reputation Calculation
#### Advisor Base Rate Calculation (el porcentaje que saldra como "cobro base" puede ser negociado en chat luego)

### Matching Domain Workflows

#### Advisor Swipe Decision
#### Create Match
#### Match Expiration
#### Cancel Match
#### Finalize Advisor Selection (Marry the prospect)


### Communication Domain Workflows

#### Chat Access Validation
#### Chat Between Advisor and Pyme




### Contract Domain Workflows

#### Propose Contract
#### Counter Offer (Se puede definir en el chat una vez hay match para bajar la tarifa del advisor)
#### Accepted Contract 
#### Reject Contract


### Project Domain Workflows

#### Create Project 
#### Close Project 
#### Project Milestone Generation
#### Project Milestone Validation	
#### Project Health Monitoring	
#### Project Completion Validation	
#### Project Status Management




### Review Domain Workflows

#### Leave a Review for a Advisor (that you have already hired in the past)
#### Leave a Review for a Pime (that you have been hired by in the past)



### Event Domain Workflows

#### Event Audit Logging
#### AdvisorIndustryUpdated Event
#### MatchCreated Event
#### ProjectStatusChanged Event
#### RecommendationUpdated Event
#### ProjectAssigned Event




#### [QUITAR LUEGO DE REALIZARLO] Reflection Pattern puede aprovechar con el recommendations verificar si tiene projectos similares con Advisor Similar Project Retrieval



---

## Architecture Diagram in Layers

---

## Design Considerations
### Algorithm Selection & Parameters


---

## Source Code

### Backend (Python/FastAPI - Domain-Driven Design)

---

# Data Design
