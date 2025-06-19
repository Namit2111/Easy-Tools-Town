from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io

router = APIRouter()

@router.post("/size")
async def get_image_size(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    return {"width": image.width, "height": image.height}

@router.post("/grayscale")
async def convert_to_grayscale(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    grayscale = image.convert("L")
    buf = io.BytesIO()
    grayscale.save(buf, format="PNG")
    buf.seek(0)
    return JSONResponse(content={"message": "Image converted to grayscale."}) 