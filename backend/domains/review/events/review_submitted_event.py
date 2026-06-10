from dataclasses import dataclass

@dataclass
class ReviewSubmittedEvent:
    review_id: str
    subject_id: str
    rating: float
