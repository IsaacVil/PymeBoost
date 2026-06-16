from dataclasses import dataclass


@dataclass
class MessageSentEvent:
    message_id: str
    chat_session_id: str
    match_id: str
    sender: str  # 'pyme' | 'advisor'
