class UseCasePdfProcessingService:
    """Orchestrates the Use Case PDF Processing pipeline:
    OCR -> block extraction -> embedding -> thematic classification -> storage."""
    def process(self, advisor_id: str, file_path: str): pass
