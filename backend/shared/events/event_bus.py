"""In-process event bus (Observer pattern).

Local-profile replacement for Google Cloud Pub/Sub (docs/mvpspec.md §2): services
publish domain events after persistence; handlers in other domains subscribe.
Subscription key is the event class name.
"""
from collections import defaultdict
from typing import Callable


class EventBus:
    def __init__(self) -> None:
        self._subscribers: dict[str, list[Callable[[object], None]]] = defaultdict(list)

    def subscribe(self, event_type: str, handler: Callable[[object], None]) -> None:
        self._subscribers[event_type].append(handler)

    def publish(self, event: object) -> None:
        for handler in self._subscribers.get(type(event).__name__, []):
            handler(event)


# Process-wide singleton (Factory at module import).
event_bus = EventBus()
