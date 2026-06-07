from fastapi import FastAPI

def create_app() -> FastAPI:
    app = FastAPI(title="PymeBoost API", version="v1")
    return app

app = create_app()
