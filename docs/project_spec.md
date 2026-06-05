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