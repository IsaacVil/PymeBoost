from pydantic import BaseModel


class ConversationResponse(BaseModel):
    """One chat in the messaging list: the match, its counterpart and a preview.

    ``status`` is a human label for the UI; ``married`` is true once the contract
    has been activated (a project exists), which flips the chat to "active".
    """

    match_id: str
    counterpart_name: str
    counterpart_monogram: str
    counterpart_role: str
    accent: str
    status: str
    contract_status: str | None
    married: bool
    last_message: str | None
