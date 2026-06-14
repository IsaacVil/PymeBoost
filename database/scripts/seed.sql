
-- ============================================================================
-- 14. SEED DE CATALOGOS
-- ============================================================================

INSERT INTO "PB_AccountTypes" ("code","name") VALUES
    ('pyme','PYME'), ('advisor','Advisor'), ('system','System');

INSERT INTO "PB_CompanySizes" ("code","name") VALUES
    ('small','Small'), ('medium','Medium'), ('large','Large');

INSERT INTO "PB_PymeStatus" ("code","name") VALUES
    ('pending','Pending'), ('active','Active'),
    ('suspended','Suspended'), ('deactivated','Deactivated');

INSERT INTO "PB_AdvisorStatus" ("code","name") VALUES
    ('pending','Pending'), ('active','Active'),
    ('suspended','Suspended'), ('deactivated','Deactivated');

INSERT INTO "PB_ImprovementCategories" ("code","name","vectorIndex") VALUES
    ('sales_marketing','Ventas y Marketing',0),
    ('operations','Operaciones y Procesos',1),
    ('finance','Finanzas',2),
    ('technology','Tecnologia',3),
    ('human_resources','Recursos Humanos',4),
    ('strategy','Estrategia y Crecimiento',5),
    ('customer_experience','Experiencia del Cliente',6),
    ('supply_chain','Cadena de Suministro',7);

INSERT INTO "PB_ThematicCategories" ("code","name","isRequired") VALUES
    ('company_information','Company Information',TRUE),
    ('company_context','Company Context',TRUE),
    ('initial_situation','Initial Situation',TRUE),
    ('actions_performed','Actions Performed',TRUE),
    ('metrics_before','Metrics Before',TRUE),
    ('metrics_after','Metrics After',TRUE);

INSERT INTO "PB_DocumentStatus" ("code","name") VALUES
    ('pending','Pending'), ('processing','Processing'),
    ('processed','Processed'), ('failed','Failed');

INSERT INTO "PB_UseCaseStatus" ("code","name") VALUES
    ('pending','Pending'), ('processing','Processing'),
    ('processed','Processed'), ('failed','Failed');

INSERT INTO "PB_MatchStatus" ("code","name","description") VALUES
    ('waiting_swipe','Waiting Swipe','Candidato generado, a la espera del swipe de la PYME'),
    ('match','Match','Swipe aprobado; relacion activa'),
    ('not_swiped','Not Swiped','Swipe rechazado (left swipe)'),
    ('unmatch','Unmatch','Match cancelado por una de las partes'),
    ('finalized','Finalized','Contrato aceptado; match sellado');

INSERT INTO "PB_ContractStatus" ("code","name") VALUES
    ('negotiating','Negotiating'), ('accepted','Accepted'),
    ('rejected','Rejected'), ('voided','Voided');

INSERT INTO "PB_ContractVersionStatus" ("code","name") VALUES
    ('pending_proposal','Pending Proposal'), ('accepted','Accepted'),
    ('rejected','Rejected'), ('superseded','Superseded');

INSERT INTO "PB_DurationTiers" ("code","name","defaultMonths","commissionPct","isCustom") VALUES
    ('standard','Standard',1,3.00,FALSE),
    ('medium','Medium',3,5.00,FALSE),
    ('high','High',6,7.00,FALSE),
    ('annual','Annual',12,10.00,FALSE),
    ('custom','Custom',NULL,NULL,TRUE);

INSERT INTO "PB_MetricValueTypes" ("code","name") VALUES
    ('number','Number'), ('percentage','Percentage');

INSERT INTO "PB_ProjectStatus" ("code","name") VALUES
    ('active','Active'),
    ('awaiting_completion_document','Awaiting Completion Document'),
    ('completed','Completed'), ('cancelled','Cancelled');

INSERT INTO "PB_ProjectHealthStatus" ("code","name") VALUES
    ('on_track','On Track'), ('at_risk','At Risk'), ('off_track','Off Track');

INSERT INTO "PB_MilestoneStatus" ("code","name") VALUES
    ('pending','Pending'), ('in_progress','In Progress'), ('completed','Completed');

INSERT INTO "PB_KpiValidationStatus" ("code","name") VALUES
    ('met','Met'), ('partial','Partial');

INSERT INTO "PB_MessageTypes" ("code","name") VALUES
    ('user','User'), ('system','System');

INSERT INTO "PB_MessageStatus" ("code","name") VALUES
    ('sent','Sent'), ('delivered','Delivered'), ('read','Read');

INSERT INTO "PB_BlockedContentCategories" ("code","name") VALUES
    ('email','Email'), ('phone','Phone'), ('social_media','Social Media');

INSERT INTO "PB_NotificationChannels" ("code","name") VALUES
    ('in_app','In-App'), ('email','Email'), ('push','Push');

INSERT INTO "PB_NotificationDeliveryStatus" ("code","name") VALUES
    ('pending','Pending'), ('sent','Sent'), ('delivered','Delivered'),
    ('read','Read'), ('failed','Failed');

INSERT INTO "PB_SessionStatus" ("code","name") VALUES
    ('active','Active'), ('expired','Expired'), ('revoked','Revoked');

INSERT INTO "PB_NotificationTypes" ("code","name") VALUES
    ('welcome','Bienvenida'),
    ('profile_updated','Perfil actualizado'),
    ('recommendation_ready','Recomendaciones listas'),
    ('use_case_processed','Use case procesado'),
    ('match_created','Match creado'),
    ('match_cancelled','Match cancelado'),
    ('message_received','Nuevo mensaje'),
    ('contract_proposed','Contrato propuesto'),
    ('contract_accepted','Contrato aceptado'),
    ('contract_rejected','Contrato rechazado'),
    ('project_created','Proyecto creado'),
    ('project_status_changed','Estado de proyecto cambiado'),
    ('milestone_completed','Milestone completado'),
    ('all_milestones_met','Todos los milestones cumplidos'),
    ('project_completed','Proyecto completado'),
    ('review_submitted','Resena recibida'),
    ('reputation_updated','Reputacion actualizada');

INSERT INTO "PB_EventTypes" ("code","name") VALUES
    ('SmeAccountCreated','SME account created'),
    ('AdvisorAccountCreated','Advisor account created'),
    ('SmeInformationUpdated','SME information updated'),
    ('AdvisorInformationUpdated','Advisor information updated'),
    ('AdvisorIndustryUpdated','Advisor industry updated'),
    ('UseCaseUploaded','Use case uploaded'),
    ('PromiseTextUpdated','Promise text updated'),
    ('RecommendationUpdated','Recommendation updated'),
    ('RecommendationRequested','Recommendation requested'),
    ('RecommendationReady','Recommendation ready'),
    ('MatchCreated','Match created'),
    ('MatchSwiped','Match swiped'),
    ('MatchCancelled','Match cancelled'),
    ('MessageSent','Message sent'),
    ('ContractProposed','Contract proposed'),
    ('ContractRejected','Contract rejected'),
    ('ContractAccepted','Contract accepted'),
    ('ProjectCreated','Project created'),
    ('ProjectStatusChanged','Project status changed'),
    ('MilestoneCompleted','Milestone completed'),
    ('AllMilestonesMet','All milestones met'),
    ('ProjectCompleted','Project completed'),
    ('ReviewSubmitted','Review submitted'),
    ('AdvisorReputationUpdated','Advisor reputation updated'),
    ('PymeReputationUpdated','Pyme reputation updated'),
    ('SmeNeedsAssessmentUpdated','SME needs assessment updated'),
    ('AdvisorUseCaseProcessed','Advisor use case processed');

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================

