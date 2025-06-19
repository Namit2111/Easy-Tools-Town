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
from fastapi import FastAPI
from app import pdf

app = FastAPI(
    title="PDF Toolkit API",
    description="A collection of endpoints for common PDF operations using top Python PDF libraries",
    version="1.0.0"
)

# Include the PDF router
app.include_router(pdf.router, prefix="/pdf", tags=["PDF"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
```

# requirements.txt
```
fastapi
uvicorn[standard]
PyPDF2
pdfplumber
pikepdf
reportlab
pdf2image
camelot-py[cv]
tabula-py
pdfminer.six
PyMuPDF
```

# app/__init__.py
```python
from fastapi import APIRouter

# create a router for the pdf module
from .pdf import router as pdf_router

# you can add more routers here in future

# optionally, expose routers in a central place
__all__ = ["pdf_router"]
```

# app/pdf.py
```python
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from typing import List
import io

# Import PDF libraries
import PyPDF2
import pdfplumber
import pikepdf
from reportlab.pdfgen import canvas
from pdf2image import convert_from_bytes
import camelot
import tabula
import fitz  # PyMuPDF

router = APIRouter()

@router.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one"""
    merger = PyPDF2.PdfMerger()
    for file in files:
        merger.append(file.file)
    buf = io.BytesIO()
    merger.write(buf)
    buf.seek(0)
    return StreamingResponse(buf, media_type="application/pdf")

@router.post("/split")
async def split_pdf(file: UploadFile = File(...)):
    """Split a PDF into individual pages"""
    reader = PyPDF2.PdfReader(file.file)
    outputs = []
    for i, page in enumerate(reader.pages):
        writer = PyPDF2.PdfWriter()
        writer.add_page(page)
        buf = io.BytesIO()
        writer.write(buf)
        buf.seek(0)
        outputs.append({"page": i + 1, "content": buf.read()})
    return JSONResponse(content={"pages": [o["page"] for o in outputs]})

@router.post("/text-extract")
async def extract_text(file: UploadFile = File(...)):
    """Extract text from PDF using pdfplumber"""
    text = []
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text.append(page.extract_text())
    return {"text": text}

@router.post("/images-extract")
async def extract_images(file: UploadFile = File(...)):
    """Extract images from PDF using PyMuPDF"""
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    images = []
    for page_index in range(len(doc)):
        for img in doc.get_page_images(page_index):
            xref = img[0]
            base_image = doc.extract_image(xref)
            images.append(base_image["image"])
    return StreamingResponse(io.BytesIO(b"".join(images)), media_type="application/octet-stream")

@router.post("/watermark")
async def watermark_pdf(file: UploadFile = File(...), watermark_text: str):
    """Add text watermark using reportlab"""
    packet = io.BytesIO()
    # create watermark
    can = canvas.Canvas(packet)
    can.setFont("Helvetica", 40)
    can.drawString(100, 500, watermark_text)
    can.save()
    packet.seek(0)

    watermark = PyPDF2.PdfReader(packet)
    pdf = PyPDF2.PdfReader(file.file)
    writer = PyPDF2.PdfWriter()

    for page in pdf.pages:
        page.merge_page(watermark.pages[0])
        writer.add_page(page)

    buf = io.BytesIO()
    writer.write(buf)
    buf.seek(0)
    return StreamingResponse(buf, media_type="application/pdf")

@router.post("/compress")
async def compress_pdf(file: UploadFile = File(...)):
    """Compress PDF using pikepdf"""
    pdf = pikepdf.Pdf.open(file.file)
    pdf.save("compressed.pdf", optimize_streams=True, compression=pikepdf.CompressionLevel.compression_level_fast)
    return StreamingResponse(open("compressed.pdf", "rb"), media_type="application/pdf")

@router.post("/tables-extract")
async def extract_tables(file: UploadFile = File(...)):
    """Extract tables with Camelot and Tabula"""
    # Camelot
    tables_camelot = camelot.read_pdf(file.file, pages="all")
    # Tabula
    file.file.seek(0)
    tables_tabula = tabula.read_pdf(file.file, pages="all", multiple_tables=True)
    return {"camelot_tables": len(tables_camelot), "tabula_tables": len(tables_tabula)}

@router.post("/to-images")
async def pdf_to_images(file: UploadFile = File(...)):
    """Convert PDF pages to images"""
    images = convert_from_bytes(file.file.read())
    output_bufs = []
    for img in images:
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        output_bufs.append(buf.read())
    return StreamingResponse(io.BytesIO(b"".join(output_bufs)), media_type="application/octet-stream")

@router.post("/metadata")
async def pdf_metadata(file: UploadFile = File(...)):
    """Extract PDF metadata"""
    reader = PyPDF2.PdfReader(file.file)
    return reader.metadata
