from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pdf_tools, image_tools, file_tools, text_tools
import uvicorn


def create_app() -> FastAPI:
    app = FastAPI(title="EasyToolTown API", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(pdf_tools, prefix="/pdf", tags=["PDF Tools"])
    app.include_router(image_tools, prefix="/image", tags=["Image Tools"])
    app.include_router(file_tools, prefix="/file", tags=["File Tools"])
    app.include_router(text_tools, prefix="/text", tags=["Text Tools"])

    return app


app = create_app() 


