from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/word-count")
async def word_count(request: TextRequest):
    count = len(request.text.split())
    return {"word_count": count}

@router.post("/char-count")
async def char_count(request: TextRequest):
    count = len(request.text)
    return {"char_count": count} 