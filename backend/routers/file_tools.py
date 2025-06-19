from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()

@router.post("/size")
async def get_file_size(file: UploadFile = File(...)):
    contents = await file.read()
    return {"size_bytes": len(contents)}

@router.post("/extension")
async def get_file_extension(file: UploadFile = File(...)):
    _, ext = os.path.splitext(file.filename)
    return {"extension": ext} 