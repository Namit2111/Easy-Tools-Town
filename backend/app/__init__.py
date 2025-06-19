from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.pdf import router as pdf_router

app = FastAPI(title="PDF Tools API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router, prefix="/pdf", tags=["pdf"])