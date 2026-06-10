from dataclasses import dataclass

@dataclass
class MessageSentEvent:
    message_id: str
    session_id: str
    sender_id: str
