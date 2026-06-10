class NotFoundException(Exception):
    def __init__(self, resource: str, id: str):
        super().__init__(f"{resource} {id} not found")
        self.resource = resource
        self.id = id
