-- ============================================================================
--  PymeBoost — Seed de catálogos
--  Motor objetivo : Google Cloud SQL for PostgreSQL (PostgreSQL 15+)
-- ----------------------------------------------------------------------------
--  Cubre ÚNICAMENTE tablas de catálogo (lookup tables).
--  Las tablas transaccionales (PB_Pymes, PB_Advisors, PB_Matches, etc.)
--  se pueblan vía la aplicación, no vía seed.
-- ----------------------------------------------------------------------------
--  NOTA DE VECTOR DIMENSION: PB_NeedsAssessments.needsVector está declarado
--  como vector(32) en el creation script. Este seed define 12 subindustrias
--  (vectorIndex 0-11). Antes de pasar a producción, actualizar el creation
--  script para usar vector(12) en esa columna.
-- ============================================================================

-- ============================================================================
-- 1. TIPOS Y ESTADOS GLOBALES
-- ============================================================================

INSERT INTO "PB_AccountTypes" ("code", "name", "description") VALUES
    ('pyme',    'PYME',    'Pequeña o mediana empresa que busca asesoría'),
    ('advisor', 'Advisor', 'Asesor de negocios que ofrece servicios de consultoría'),
    ('system',  'System',  'Actor del sistema para eventos automatizados');

INSERT INTO "PB_Roles" ("code", "name", "description") VALUES
    ('pyme_owner',   'PYME Owner',         'Propietario o representante de una PYME registrada en la plataforma'),
    ('advisor',      'Advisor',            'Asesor de negocios registrado y verificado en la plataforma'),
    ('admin',        'Administrador',      'Administrador interno con acceso total a la plataforma'),
    ('system_agent', 'Agente del Sistema', 'Actor automatizado para ejecución de pipelines y tareas programadas');

INSERT INTO "PB_CompanySizes" ("code", "name", "description") VALUES
    ('small',  'Pequeña', 'Hasta 30 empleados'),
    ('medium', 'Mediana', 'Entre 31 y 100 empleados'),
    ('large',  'Grande',  'Más de 100 empleados');

INSERT INTO "PB_PymeStatus" ("code", "name", "description") VALUES
    ('pending',     'Pendiente',    'Cuenta creada, pendiente de verificación'),
    ('active',      'Activa',       'Cuenta verificada y operativa'),
    ('suspended',   'Suspendida',   'Cuenta temporalmente inhabilitada por incumplimiento'),
    ('deactivated', 'Desactivada',  'Cuenta cerrada permanentemente');

INSERT INTO "PB_AdvisorStatus" ("code", "name", "description") VALUES
    ('pending',     'Pendiente',    'Registro completado, pendiente de revisión interna'),
    ('active',      'Activo',       'Perfil aprobado y visible en la plataforma'),
    ('suspended',   'Suspendido',   'Cuenta temporalmente inhabilitada'),
    ('deactivated', 'Desactivado',  'Cuenta cerrada permanentemente');

INSERT INTO "PB_SessionStatus" ("code", "name", "description") VALUES
    ('active',  'Activa',   'Sesión vigente dentro del TTL'),
    ('expired', 'Expirada', 'Sesión vencida por TTL sin actividad'),
    ('revoked', 'Revocada', 'Sesión invalidada manualmente (logout o seguridad)');

-- ============================================================================
-- 2. INDUSTRIAS Y SUBINDUSTRIAS
-- ============================================================================

INSERT INTO "PB_Industries" ("code", "name", "description") VALUES
    ('technology',            'Tecnología e Innovación',      'Empresas de software, hardware, servicios TI y startups tecnológicas'),
    ('retail',                'Retail y Comercio',            'Tiendas físicas, comercio electrónico y distribución al consumidor final'),
    ('food_beverage',         'Alimentos y Bebidas',          'Producción, procesamiento y comercialización de alimentos y bebidas'),
    ('professional_services', 'Servicios Profesionales',      'Consultoría, contabilidad, legal, marketing y otros servicios B2B'),
    ('manufacturing',         'Manufactura e Industria',      'Producción industrial, ensamblaje y procesos de transformación'),
    ('construction',          'Construcción y Bienes Raíces', 'Proyectos de construcción, desarrollo inmobiliario y gestión de obras'),
    ('tourism',               'Turismo y Hospitalidad',       'Hoteles, restaurantes, agencias de viaje y servicios de experiencia'),
    ('health',                'Salud y Bienestar',            'Clínicas, laboratorios, farmacias y servicios de salud privada'),
    ('education',             'Educación y Capacitación',     'Centros educativos privados, academias y plataformas de formación'),
    ('agriculture',           'Agroindustria',                'Producción agrícola, pecuaria, exportación y agroindustria');

-- Subindustrias: áreas de especialización asesora (cada una = una dimensión del vector).
-- vectorIndex define la posición fija en el vector de necesidades de la PYME
-- y en el vector de expertise del advisor.

INSERT INTO "PB_SubIndustries" ("industryId", "code", "name", "description", "vectorIndex") VALUES
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'technology'),
        'software_dev',
        'Desarrollo de Software y Aplicaciones',
        'Implementación de ERP, CRM, apps móviles y automatización de procesos con tecnología',
        0
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'technology'),
        'data_analytics',
        'Datos, Analytics e Inteligencia Artificial',
        'Diseño de dashboards, análisis de datos operativos y modelos predictivos para la toma de decisiones',
        1
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'technology'),
        'cybersecurity',
        'Ciberseguridad y Privacidad de Datos',
        'Políticas de seguridad, gestión de accesos, cumplimiento de protección de datos y respaldo',
        2
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'retail'),
        'ecommerce_digital',
        'E-commerce y Canales de Venta Digital',
        'Apertura y optimización de tiendas en línea, marketplaces y estrategias de conversión digital',
        3
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services'),
        'accounting_finance',
        'Contabilidad, Finanzas y Gestión Fiscal',
        'Estados financieros, flujo de caja, presupuestación, planificación tributaria y cumplimiento fiscal',
        4
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services'),
        'legal_compliance',
        'Legal, Contratos y Cumplimiento Normativo',
        'Estructuración societaria, contratos comerciales, cumplimiento laboral y regulatorio en Costa Rica',
        5
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services'),
        'marketing_branding',
        'Marketing, Marca y Comunicación Corporativa',
        'Estrategia de marca, posicionamiento, campañas digitales y gestión de comunidades',
        6
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services'),
        'hr_talent',
        'Recursos Humanos y Gestión del Talento',
        'Reclutamiento, onboarding, evaluación de desempeño, clima organizacional y retención',
        7
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'professional_services'),
        'strategy_growth',
        'Planificación Estratégica y Crecimiento',
        'Definición de modelo de negocio, expansión a nuevos mercados, OKRs y planificación a mediano plazo',
        8
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'manufacturing'),
        'lean_operations',
        'Lean Manufacturing y Mejora de Procesos',
        'Mapeo y optimización de procesos operativos, reducción de desperdicios y gestión de indicadores',
        9
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'manufacturing'),
        'quality_systems',
        'Sistemas de Gestión y Certificaciones de Calidad',
        'Implementación de ISO 9001, HACCP, BPM y otros sistemas de certificación',
        10
    ),
    (
        (SELECT "id" FROM "PB_Industries" WHERE "code" = 'agriculture'),
        'agri_exports',
        'Exportación Agrícola e Internacionalización',
        'Acceso a mercados internacionales, trazabilidad, requisitos fitosanitarios y logística de exportación',
        11
    );

-- ============================================================================
-- 3. CATÁLOGO DE PREGUNTAS DEL NEEDS ASSESSMENT
-- ============================================================================

INSERT INTO "PB_QuestionCatalog" ("questionText", "displayOrder") VALUES
    ('¿Tiene definida una propuesta de valor clara y diferenciada de su competencia, y la comunica de forma consistente?',                                           1),
    ('¿Cuenta con un proceso estructurado para captar, calificar y cerrar nuevos clientes?',                                                                         2),
    ('¿Realiza acciones concretas para fidelizar a sus clientes actuales y mide su nivel de satisfacción periódicamente?',                                           3),
    ('¿Tiene identificado con claridad el perfil de su cliente ideal: quién es, qué necesita y cómo toma decisiones de compra?',                                     4),
    ('¿Su empresa tiene presencia activa en redes sociales o medios digitales y genera contenido de forma regular y planificada?',                                    5),
    ('¿Elabora un presupuesto anual y hace seguimiento mensual a sus ingresos, egresos y rentabilidad?',                                                              6),
    ('¿Tiene claros sus costos fijos, costos variables y el punto de equilibrio necesario para que el negocio sea rentable?',                                         7),
    ('¿Ha definido una política de precios basada en sus costos, la competencia y el valor percibido por el cliente?',                                                8),
    ('¿Sus procesos operativos más críticos están documentados y existe más de una persona capaz de ejecutarlos?',                                                    9),
    ('¿Mide el desempeño de su equipo con objetivos claros y les da retroalimentación estructurada de forma periódica?',                                             10),
    ('¿Ha definido un plan de crecimiento con metas concretas a 1 y 3 años, y le hace seguimiento regularmente?',                                                   11),
    ('¿Tiene negociaciones formales con sus principales proveedores en cuanto a precios, plazos y condiciones de pago?',                                             12),
    ('¿Su empresa cumple con todas sus obligaciones tributarias y laborales vigentes en Costa Rica?',                                                                13),
    ('¿Ha explorado vender sus productos o servicios en nuevos mercados, ya sea fuera de Costa Rica o en regiones donde aún no opera?',                             14),
    ('¿Cuenta con indicadores clave (KPIs) que le permiten saber con frecuencia semanal o mensual si su negocio está yendo bien?',                                  15);

-- Vínculos pregunta → subindustria (una pregunta puede asociarse a 1 o más subindustrias)
INSERT INTO "PB_QuestionSubIndustries" ("questionId", "subIndustryId") VALUES
    -- Q1: Propuesta de valor → strategy_growth + marketing_branding
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 1),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'strategy_growth')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 1),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    -- Q2: Captación de clientes → marketing_branding
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 2),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    -- Q3: Fidelización y satisfacción → marketing_branding + strategy_growth
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 3),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 3),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'strategy_growth')),
    -- Q4: Perfil del cliente ideal → marketing_branding
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 4),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    -- Q5: Presencia digital → marketing_branding + ecommerce_digital
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 5),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 5),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'ecommerce_digital')),
    -- Q6: Presupuesto y seguimiento financiero → accounting_finance
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 6),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'accounting_finance')),
    -- Q7: Costos y punto de equilibrio → accounting_finance
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 7),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'accounting_finance')),
    -- Q8: Política de precios → marketing_branding + accounting_finance
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 8),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'marketing_branding')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 8),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'accounting_finance')),
    -- Q9: Procesos operativos → lean_operations
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 9),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'lean_operations')),
    -- Q10: Desempeño del equipo → hr_talent
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 10),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'hr_talent')),
    -- Q11: Plan de crecimiento → strategy_growth
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 11),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'strategy_growth')),
    -- Q12: Negociación con proveedores → lean_operations
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 12),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'lean_operations')),
    -- Q13: Cumplimiento tributario y laboral → legal_compliance + accounting_finance
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 13),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'legal_compliance')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 13),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'accounting_finance')),
    -- Q14: Nuevos mercados → strategy_growth + agri_exports
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 14),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'strategy_growth')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 14),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'agri_exports')),
    -- Q15: KPIs de negocio → strategy_growth + lean_operations
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 15),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'strategy_growth')),
    ((SELECT "id" FROM "PB_QuestionCatalog" WHERE "displayOrder" = 15),
     (SELECT "id" FROM "PB_SubIndustries"   WHERE "code" = 'lean_operations'));

-- ============================================================================
-- 4. DOCUMENTOS Y USE CASES
-- ============================================================================

INSERT INTO "PB_ThematicCategories" ("code", "name", "description", "isRequired") VALUES
    ('company_information', 'Información de la Empresa',  'Nombre, industria, tamaño y datos generales de la empresa del use case',              TRUE),
    ('company_context',     'Contexto Empresarial',       'Situación de mercado, competidores y contexto previo al proyecto del use case',        TRUE),
    ('initial_situation',   'Situación Inicial',          'Estado del problema o área de mejora antes de la intervención del asesor',             TRUE),
    ('actions_performed',   'Acciones Realizadas',        'Metodología, actividades y pasos ejecutados por el asesor durante el proyecto',        TRUE),
    ('metrics_before',      'Métricas Antes',             'Valores cuantitativos del indicador objetivo medidos antes de la intervención',        TRUE),
    ('metrics_after',       'Métricas Después',           'Valores cuantitativos del indicador objetivo medidos después de la intervención',      TRUE);

INSERT INTO "PB_DocumentStatus" ("code", "name", "description") VALUES
    ('pending',    'Pendiente',     'Archivo subido a GCS, en espera de procesamiento'),
    ('processing', 'Procesando',    'En proceso de OCR y extracción de contenido'),
    ('processed',  'Procesado',     'Contenido extraído, embeddings generados y almacenados'),
    ('failed',     'Fallido',       'El procesamiento falló; se notificó al propietario');

INSERT INTO "PB_DocumentTypes" ("code", "name", "description") VALUES
    ('use_case',   'Use Case',            'PDF de caso de éxito subido por el advisor al registrarse o actualizar su perfil'),
    ('baseline',   'Documento de Línea Base',  'PDF de métricas iniciales del proyecto, subido por la PYME al inicio del proyecto'),
    ('completion', 'Documento de Cierre', 'PDF de resultados finales del proyecto, subido por el advisor al solicitar cierre');

INSERT INTO "PB_UseCaseStatus" ("code", "name", "description") VALUES
    ('pending',    'Pendiente',  'Use case registrado, documento en procesamiento'),
    ('processing', 'Procesando', 'OCR y clasificación temática en curso'),
    ('processed',  'Procesado',  'Bloques extraídos, embeddings generados, score actualizado en PB_AdvisorSubIndustryScores'),
    ('failed',     'Fallido',    'El procesamiento del PDF falló; use case inactivo');

-- ============================================================================
-- 5. MATCHING
-- ============================================================================

INSERT INTO "PB_MatchStatus" ("code", "name", "description") VALUES
    ('waiting_swipe', 'Esperando Swipe', 'Candidato generado por el algoritmo; en espera de la decisión de swipe de la PYME'),
    ('match',         'Match',           'La PYME hizo swipe derecho; relación activa entre PYME y advisor'),
    ('not_swiped',    'No Swiped',       'La PYME hizo swipe izquierdo; advisor excluido de futuros candidatos para esta PYME'),
    ('unmatch',       'Unmatch',         'Match cancelado: el advisor decidió no continuar'),
    ('finalized',     'Finalizado',      'Contrato aceptado y cerrado; match sellado de forma permanente');

-- ============================================================================
-- 6. CONTRATOS
-- ============================================================================

INSERT INTO "PB_ContractStatus" ("code", "name", "description") VALUES
    ('negotiating', 'Negociando', 'Existe al menos una versión en estado pending_proposal; aún no hay acuerdo'),
    ('accepted',    'Aceptado',   'Una versión fue aceptada por ambas partes; contrato vigente'),
    ('rejected',    'Rechazado',  'La negociación terminó sin acuerdo; ninguna versión fue aceptada'),
    ('voided',      'Anulado',    'Contrato aceptado invalidado posteriormente por cancelación del match o proyecto');

INSERT INTO "PB_ContractVersionStatus" ("code", "name", "description") VALUES
    ('pending_proposal', 'Propuesta Pendiente', 'Versión enviada, esperando respuesta de la contraparte'),
    ('accepted',         'Aceptada',            'La contraparte aceptó esta versión; contrato en vigor'),
    ('rejected',         'Rechazada',           'La contraparte rechazó esta versión y presentó contraoferta'),
    ('superseded',       'Superada',            'Versión reemplazada por una versión posterior en la misma negociación');

-- ============================================================================
-- 7. MÉTRICAS
-- ============================================================================

INSERT INTO "PB_MetricValueTypes" ("code", "name", "description") VALUES
    ('number',     'Número',     'Valor absoluto (unidades, monto en colones, cantidad de clientes, etc.)'),
    ('percentage', 'Porcentaje', 'Valor relativo expresado como porcentaje (0–100)');

-- ============================================================================
-- 8. PROYECTOS
-- ============================================================================

INSERT INTO "PB_ProjectStatus" ("code", "name", "description") VALUES
    ('active',                        'Activo',                         'Proyecto en ejecución; subfases y fases en progreso'),
    ('awaiting_completion_document',  'Esperando Documento de Cierre',  'Todas las fases completadas; pendiente el PDF de cierre del advisor'),
    ('completed',                     'Completado',                     'Documento de cierre procesado y KPIs validados por la IA'),
    ('cancelled',                     'Cancelado',                      'Proyecto interrumpido antes de su conclusión');

INSERT INTO "PB_ProjectHealthStatus" ("code", "name", "description") VALUES
    ('on_track',  'En Tiempo',  'Progreso de subfases acorde al tiempo transcurrido del contrato'),
    ('at_risk',   'En Riesgo',  'Progreso ligeramente por debajo del ritmo esperado; requiere atención'),
    ('off_track', 'Retrasado',  'Progreso significativamente inferior al esperado; intervención necesaria');

-- ============================================================================
-- 9. COMUNICACIÓN
-- ============================================================================

INSERT INTO "PB_MessageTypes" ("code", "name", "description") VALUES
    ('user',   'Usuario', 'Mensaje enviado por un participante humano del chat (PYME o advisor)'),
    ('system', 'Sistema', 'Mensaje generado automáticamente por el sistema (ej: contrato propuesto, match creado)');

INSERT INTO "PB_MessageStatus" ("code", "name", "description") VALUES
    ('sent',      'Enviado',    'Mensaje persistido en base de datos y entregado al servidor'),
    ('delivered', 'Entregado',  'Mensaje recibido en el cliente del destinatario'),
    ('read',      'Leído',      'El destinatario abrió y visualizó el mensaje');

INSERT INTO "PB_BlockedContentCategories" ("code", "name", "description") VALUES
    ('email',        'Correo Electrónico', 'Intento de compartir una dirección de correo electrónico fuera de la plataforma'),
    ('phone',        'Teléfono',           'Intento de compartir un número de teléfono fuera de la plataforma'),
    ('social_media', 'Red Social',         'Intento de compartir un perfil o handle de red social fuera de la plataforma');

-- ============================================================================
-- 10. NOTIFICACIONES
-- ============================================================================

INSERT INTO "PB_NotificationTypes" ("code", "name", "description", "isActive") VALUES
    ('welcome',                   'Bienvenida',                           'Notificación de bienvenida enviada al completar el registro',                                    TRUE),
    ('profile_updated',           'Perfil Actualizado',                   'Confirmación de que los cambios al perfil fueron guardados correctamente',                       TRUE),
    ('recommendation_ready',      'Recomendaciones Listas',               'Las recomendaciones de asesores para la PYME han sido actualizadas',                             TRUE),
    ('use_case_processed',        'Use Case Procesado',                   'El PDF de use case fue procesado correctamente o falló; se notifica al advisor',                 TRUE),
    ('match_created',             'Nuevo Match',                          'La PYME hizo swipe derecho y se creó un match con el advisor',                                   TRUE),
    ('match_cancelled',           'Match Cancelado',                      'El advisor canceló el match; la PYME es notificada',                                             TRUE),
    ('message_received',          'Nuevo Mensaje',                        'Se recibió un nuevo mensaje en el chat del match',                                               TRUE),
    ('contract_proposed',         'Propuesta de Contrato Recibida',       'La contraparte envió una propuesta o contraoferta de contrato',                                  TRUE),
    ('contract_accepted',         'Contrato Aceptado',                    'Ambas partes aceptaron los términos del contrato; el proyecto iniciará pronto',                  TRUE),
    ('contract_rejected',         'Propuesta Rechazada',                  'La contraparte rechazó la propuesta y envió una contraoferta',                                   TRUE),
    ('project_created',           'Proyecto Iniciado',                    'El proyecto fue creado a partir del contrato aceptado',                                           TRUE),
    ('baseline_submitted',        'Línea Base Recibida',                  'La PYME envió el documento de línea base del proyecto; el advisor puede iniciar el trabajo',    TRUE),
    ('subphase_completed',        'Subfase Completada',                   'El advisor validó una subfase del roadmap del proyecto',                                         TRUE),
    ('project_status_changed',    'Estado del Proyecto Actualizado',      'El sistema actualizó el estado de salud del proyecto (en tiempo, en riesgo, retrasado)',         TRUE),
    ('project_completed',         'Proyecto Completado',                  'El proyecto fue cerrado y los KPIs validados; ya es posible dejar reseñas',                      TRUE),
    ('review_submitted',          'Reseña Recibida',                      'La otra parte del proyecto dejó una reseña sobre tu desempeño',                                  TRUE),
    ('reputation_updated',        'Puntuación Actualizada',               'Tu puntuación de reputación en la plataforma fue recalculada tras recibir una nueva reseña',     TRUE),
    ('needs_assessment_updated',  'Necesidades Actualizadas',             'La PYME actualizó su evaluación de necesidades; las recomendaciones serán recalculadas',         TRUE);

INSERT INTO "PB_NotificationChannels" ("code", "name", "description") VALUES
    ('in_app', 'En Aplicación', 'Notificación mostrada dentro de la interfaz de PymeBoost'),
    ('email',  'Correo',        'Notificación enviada al correo electrónico registrado del usuario'),
    ('push',   'Push',          'Notificación push enviada al navegador o dispositivo móvil del usuario');

INSERT INTO "PB_NotificationDeliveryStatus" ("code", "name", "description") VALUES
    ('pending',   'Pendiente',  'Notificación encolada, aún no enviada al canal'),
    ('sent',      'Enviada',    'Notificación despachada al proveedor del canal (email, push, etc.)'),
    ('delivered', 'Entregada',  'El proveedor confirmó la entrega al dispositivo o bandeja del usuario'),
    ('read',      'Leída',      'El usuario abrió o interactuó con la notificación'),
    ('failed',    'Fallida',    'El envío al canal falló; se registra el error para reintento o auditoría');

-- ============================================================================
-- 11. EVENTOS DE DOMINIO
-- ============================================================================

INSERT INTO "PB_EventTypes" ("code", "name", "description") VALUES
    ('SmeAccountCreated',          'SME Account Created',           'Se creó una cuenta de PYME; dispara inicialización del perfil y bienvenida'),
    ('AdvisorAccountCreated',      'Advisor Account Created',       'Se creó una cuenta de advisor; dispara extracción de LinkedIn y seed de perfil'),
    ('SmeInformationUpdated',      'SME Information Updated',       'La PYME actualizó datos de su perfil (nombre, tamaño, industria, etc.)'),
    ('AdvisorInformationUpdated',  'Advisor Information Updated',   'El advisor actualizó datos de su perfil (bio, tarifa base, disponibilidad)'),
    ('AdvisorIndustryUpdated',     'Advisor Industry Updated',      'El advisor actualizó sus industrias de especialización'),
    ('UseCaseUploaded',            'Use Case Uploaded',             'El advisor subió uno o más PDFs de use cases; dispara el pipeline de procesamiento IA'),
    ('AdvisorUseCaseProcessed',    'Advisor Use Case Processed',    'El pipeline de IA terminó de procesar un use case (éxito o fallo)'),
    ('PromiseTextUpdated',         'Promise Text Updated',          'El advisor creó o modificó una de sus promesas de éxito; dispara clasificación temática'),
    ('SmeNeedsAssessmentUpdated',  'SME Needs Assessment Updated',  'La PYME completó o actualizó su evaluación de necesidades; invalida caché de recomendaciones'),
    ('RecommendationRequested',    'Recommendation Requested',      'La PYME solicitó recomendaciones on-demand desde la interfaz'),
    ('RecommendationReady',        'Recommendation Ready',          'El algoritmo generó un nuevo conjunto de recomendaciones para la PYME'),
    ('RecommendationUpdated',      'Recommendation Updated',        'Las recomendaciones de una PYME fueron recalculadas (batch nocturno o on-demand)'),
    ('MatchSwiped',                'Match Swiped',                  'La PYME realizó un swipe (derecho o izquierdo) sobre un advisor candidato'),
    ('MatchCreated',               'Match Created',                 'Swipe derecho aprobado; se creó el match y se abre el canal de comunicación'),
    ('MatchCancelled',             'Match Cancelled',               'El advisor canceló el match; la PYME es notificada y el match queda inactivo'),
    ('MessageSent',                'Message Sent',                  'Un participante envió un mensaje en el chat del match; notifica a la contraparte'),
    ('ContractProposed',           'Contract Proposed',             'Una parte propuso o contrapropuso términos de contrato en la negociación'),
    ('ContractRejected',           'Contract Rejected',             'La contraparte rechazó la versión de contrato y emitió una nueva propuesta'),
    ('ContractAccepted',           'Contract Accepted',             'Ambas partes acordaron los términos; el contrato queda vigente y se crea el proyecto'),
    ('ProjectCreated',             'Project Created',               'Se creó el proyecto a partir del contrato aceptado; la PYME debe enviar línea base'),
    ('BaselineSubmitted',          'Baseline Submitted',            'La PYME subió el documento de línea base del proyecto; se habilita el trabajo del advisor'),
    ('SubphaseCompleted',          'Subphase Completed',            'El advisor validó una subfase del roadmap; el sistema evalúa si la fase padre se cierra'),
    ('ProjectStatusChanged',       'Project Status Changed',        'El monitor de salud recalculó el estado del proyecto (on_track, at_risk, off_track)'),
    ('ProjectCompleted',           'Project Completed',             'El documento de cierre fue procesado y los KPIs validados; se habilitan las reseñas'),
    ('ReviewSubmitted',            'Review Submitted',              'Un participante dejó una reseña al otro al cierre del proyecto; actualiza reputación'),
    ('AdvisorReputationUpdated',   'Advisor Reputation Updated',    'La puntuación de reputación del advisor fue recalculada tras una nueva reseña'),
    ('PymeReputationUpdated',      'Pyme Reputation Updated',       'La puntuación de reputación de la PYME fue recalculada tras una nueva reseña');

-- ============================================================================
-- 12. MEDIA FILES
-- ============================================================================

INSERT INTO "PV_MediaTypes" ("name", "playerImpl") VALUES
    ('PDF',         'pdf_viewer'),
    ('Image',       'image_viewer'),
    ('Video',       'video_player'),
    ('Audio',       'audio_player'),
    ('Spreadsheet', 'spreadsheet_viewer');

-- Archivos de ejemplo que pueden originar documentos de negocio en PB_Documents.
-- mediapath refleja la ruta GCS donde se almacena el archivo fisico.
INSERT INTO "PV_MediaFiles" ("mediapath", "deleted", "lastupdate", "userid", "mediatypeid", "sizeMB", "encoding", "samplerate", "languagecode") VALUES
    (
        'gs://pymeboost-docs/advisors/auth0|advisor001/use_cases/caso_exito_tecnologia.pdf',
        FALSE, now(), 'auth0|advisor001',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'PDF'),
        1.840, 'UTF-8', NULL, 'es'
    ),
    (
        'gs://pymeboost-docs/advisors/auth0|advisor001/use_cases/caso_exito_finanzas.pdf',
        FALSE, now(), 'auth0|advisor001',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'PDF'),
        2.310, 'UTF-8', NULL, 'es'
    ),
    (
        'gs://pymeboost-docs/pymes/auth0|pyme001/baseline/linea_base_proyecto.pdf',
        FALSE, now(), 'auth0|pyme001',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'PDF'),
        0.950, 'UTF-8', NULL, 'es'
    ),
    (
        'gs://pymeboost-docs/pymes/auth0|pyme002/baseline/reporte_inicial.xlsx',
        FALSE, now(), 'auth0|pyme002',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'Spreadsheet'),
        0.420, 'UTF-8', NULL, 'es'
    ),
    (
        'gs://pymeboost-docs/advisors/auth0|advisor002/profile/intro_video.mp4',
        FALSE, now(), 'auth0|advisor002',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'Video'),
        45.700, 'H.264/AAC', '48000Hz', 'es'
    ),
    (
        'gs://pymeboost-docs/advisors/auth0|advisor001/use_cases/caso_exito_tecnologia_v2.pdf',
        TRUE,  now(), 'auth0|advisor001',
        (SELECT "mediaTypeId" FROM "PV_MediaTypes" WHERE "name" = 'PDF'),
        1.920, 'UTF-8', NULL, 'es'
    );

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
