import io
import base64
import tempfile
from typing import List, Optional
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from PIL import Image, UnidentifiedImageError
import pdfplumber
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from datetime import datetime

from .core import validate_pdf, cleanup_temp_files, logger

async def extract_images_from_pdf(
    file: UploadFile,
    page_numbers: Optional[List[int]],
    resolution: int,
    background_tasks
) -> JSONResponse:
    """Extract embedded images from a PDF document."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            images_data = []
            with pdfplumber.open(temp_file_path) as pdf:
                page_indices = []
                if page_numbers:
                    page_indices = [p-1 for p in page_numbers if 1 <= p <= len(pdf.pages)]
                else:
                    page_indices = range(len(pdf.pages))
                
                for i in page_indices:
                    page = pdf.pages[i]
                    for img_index, img in enumerate(page.images):
                        x0, top, x1, bottom = img["x0"], img["top"], img["x1"], img["bottom"]
                        crop = page.crop((x0, top, x1, bottom)).to_image(resolution=resolution)
                        bio = io.BytesIO()
                        crop.save(bio, format="PNG")
                        bio.seek(0)
                        
                        base64_image = base64.b64encode(bio.getvalue()).decode("utf-8")
                        
                        images_data.append({
                            "page": i+1,
                            "index": img_index,
                            "image_base64": base64_image,
                            "width": crop.width,
                            "height": crop.height
                        })
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content={"images": images_data})
    
    except Exception as e:
        logger.error(f"Image extraction error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"Image extraction failed: {str(e)}")

async def images_to_pdf(
    files: List[UploadFile],
    page_size: str,
    margin: int,
    background_tasks
) -> StreamingResponse:
    """Convert uploaded images to a single PDF document."""
    if not files:
        raise HTTPException(status_code=400, detail="No image files provided")
    
    temp_files = []
    
    try:
        pil_images = []
        
        for file in files:
            if not file.content_type.startswith("image/"):
                raise HTTPException(status_code=400, detail=f"File {file.filename} is not an image")
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".img") as temp_file:
                temp_file.write(file.file.read())
                temp_file.flush()
                temp_files.append(temp_file.name)
                
                try:
                    img = Image.open(temp_file.name)
                    if img.mode == 'RGBA':
                        white_bg = Image.new('RGBA', img.size, (255, 255, 255, 255))
                        img = Image.alpha_composite(white_bg, img).convert('RGB')
                    elif img.mode != 'RGB':
                        img = img.convert('RGB')
                    pil_images.append(img)
                except UnidentifiedImageError:
                    raise HTTPException(status_code=400, detail=f"Cannot process {file.filename} as an image")
        
        if not pil_images:
            raise HTTPException(status_code=400, detail="No valid images found")
            
        output = io.BytesIO()
        
        first_image = pil_images[0]
        first_image.save(
            output, 
            format="PDF", 
            save_all=True, 
            append_images=pil_images[1:],
            resolution=100.0,
            quality=95,
            optimize=True
        )
        
        output.seek(0)
        
        background_tasks.add_task(cleanup_temp_files, temp_files)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"images_to_pdf_{timestamp}.pdf"
        
        return StreamingResponse(
            output, 
            media_type="application/pdf", 
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    
    except Exception as e:
        logger.error(f"Image to PDF conversion error: {str(e)}")
        cleanup_temp_files(temp_files)
        raise HTTPException(status_code=500, detail=f"Image to PDF conversion failed: {str(e)}") 