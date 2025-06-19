from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import PyPDF2

router = APIRouter()

@router.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    reader = PyPDF2.PdfReader(await file.read())
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return {"text": text}

@router.post("/metadata")
async def get_metadata(file: UploadFile = File(...)):
    reader = PyPDF2.PdfReader(await file.read())
    metadata = reader.metadata
    return {"metadata": dict(metadata) if metadata else {}} 