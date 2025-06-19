 fastapi_pdf_backend/
├── run.py
├── requirements.txt
└── app
    ├── __init__.py
    └── pdf.py
```

---

# run.py
```python
import uvicorn
from app import app

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
```

# requirements.txt
```
fastapi
uvicorn
PyPDF2
pdfminer.six
pdfplumber
pikepdf
Pillow
reportlab
camelot-py[cv]
```

# app/__init__.py
```python
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
```

# app/pdf.py
```python
import io
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from PyPDF2 import PdfReader, PdfWriter
from pdfminer.high_level import extract_text
import pdfplumber
import pikepdf
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import camelot

router = APIRouter()

@router.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDFs into one."""
    writer = PdfWriter()
    for file in files:
        reader = PdfReader(file.file)
        for page in reader.pages:
            writer.add_page(page)
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=merged.pdf"})

@router.post("/split")
async def split_pdf(file: UploadFile = File(...), start: int = 1, end: Optional[int] = None):
    """Split a PDF by page range."""
    reader = PdfReader(file.file)
    writer = PdfWriter()
    num_pages = len(reader.pages)
    if end is None or end > num_pages:
        end = num_pages
    if start < 1 or start > end:
        raise HTTPException(status_code=400, detail="Invalid page range")
    for i in range(start-1, end):
        writer.add_page(reader.pages[i])
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=split_{start}_{end}.pdf"})

@router.post("/extract-text")
async def extract_text_from_pdf(file: UploadFile = File(...)):
    """Extract text from PDF."""
    try:
        text = extract_text(file.file)
        return JSONResponse(content={"text": text})
    except Exception:
        raise HTTPException(status_code=500, detail="Text extraction failed")

@router.post("/extract-images")
async def extract_images_from_pdf(file: UploadFile = File(...)):
    """Extract images from PDF."""
    images = []
    with pdfplumber.open(file.file) as pdf:
        for i, page in enumerate(pdf.pages):
            for img in page.images:
                x0, top, x1, bottom = img["x0"], img["top"], img["x1"], img["bottom"]
                crop = page.crop((x0, top, x1, bottom)).to_image(resolution=150)
                bio = io.BytesIO()
                crop.save(bio, format="PNG")
                bio.seek(0)
                images.append({"page": i+1, "image_bytes": bio.getvalue()})
    return images

@router.post("/compress")
async def compress_pdf(file: UploadFile = File(...), quality: int = 80):
    """Compress PDF size."""
    output = io.BytesIO()
    try:
        pdf = pikepdf.Pdf.open(file.file)
        compress_opts = pikepdf.Compress(streams=True, images=True)
        pdf.save(output, compression=pikepdf.CompressionLevel.default)
        output.seek(0)
        return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=compressed.pdf"})
    except Exception:
        raise HTTPException(status_code=500, detail="Compression failed")

@router.post("/rotate")
async def rotate_pdf(file: UploadFile = File(...), degrees: int = 90):
    """Rotate PDF pages."""
    reader = PdfReader(file.file)
    writer = PdfWriter()
    for page in reader.pages:
        page.rotate_clockwise(degrees)
        writer.add_page(page)
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=rotated.pdf"})

@router.post("/watermark")
async def add_watermark(file: UploadFile = File(...), watermark_text: str = "CONFIDENTIAL"):
    """Add watermark to PDF."""
    # Create watermark PDF
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)
    can.setFont("Helvetica", 40)
    can.saveState()
    can.translate(300, 400)
    can.rotate(45)
    can.drawCentredString(0, 0, watermark_text)
    can.restoreState()
    can.save()
    packet.seek(0)
    watermark = PdfReader(packet)
    wm_page = watermark.pages[0]

    reader = PdfReader(file.file)
    writer = PdfWriter()
    for page in reader.pages:
        page.merge_page(wm_page)
        writer.add_page(page)
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=watermarked.pdf"})

@router.post("/encrypt")
async def encrypt_pdf(file: UploadFile = File(...), password: str = "secret"):
    """Encrypt PDF with password."""
    reader = PdfReader(file.file)
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.encrypt(user_pwd=password, owner_pwd=password)
    output = io.BytesIO()
    writer.write(output)
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=encrypted.pdf"})

@router.post("/decrypt")
async def decrypt_pdf(file: UploadFile = File(...), password: str = "secret"):
    """Decrypt PDF with password."""
    try:
        pdf = pikepdf.Pdf.open(file.file, password=password)
        output = io.BytesIO()
        pdf.save(output)
        output.seek(0)
        return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=decrypted.pdf"})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid password or decryption failed")

@router.post("/images-to-pdf")
async def images_to_pdf(files: List[UploadFile] = File(...)):
    """Convert uploaded images to a single PDF."""
    pil_images = []
    for file in files:
        img = Image.open(file.file)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        pil_images.append(img)
    output = io.BytesIO()
    pil_images[0].save(output, format="PDF", save_all=True, append_images=pil_images[1:])
    output.seek(0)
    return StreamingResponse(output, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=images_to_pdf.pdf"})
