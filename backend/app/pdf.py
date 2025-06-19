import io
import base64
import logging
from typing import List, Optional, Dict, Any, Union
from fastapi import APIRouter, UploadFile, File, HTTPException, Query, BackgroundTasks, Depends
from fastapi.responses import StreamingResponse, JSONResponse
from PyPDF2 import PdfReader, PdfWriter
from pdfminer.high_level import extract_text
import pdfplumber
import pikepdf
from PIL import Image, UnidentifiedImageError
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
import tempfile
import os
import asyncio
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("pdf_service")

router = APIRouter(
    tags=["PDF Operations"],
)

# Helper Functions
def validate_pdf(file: UploadFile) -> bool:
    """Validate if the uploaded file is a PDF."""
    if not file.content_type == "application/pdf":
        return False
    
    # Additional validation
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            
            # Try to open with PyPDF2
            reader = PdfReader(temp_file.name)
            if len(reader.pages) < 1:
                return False
            
            # Reset file pointer
            file.file.seek(0)
            return True
    except Exception as e:
        logger.error(f"PDF validation error: {str(e)}")
        file.file.seek(0)  # Reset file pointer
        return False
    finally:
        # Clean up
        if 'temp_file' in locals():
            os.unlink(temp_file.name)

def cleanup_temp_files(file_paths: List[str]):
    """Clean up temporary files."""
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.unlink(file_path)
        except Exception as e:
            logger.error(f"Error cleaning up {file_path}: {str(e)}")

# API Endpoints
@router.post("/merge", summary="Merge multiple PDFs into one")
async def merge_pdfs(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(..., description="PDF files to merge")
):
    """
    Merge multiple PDFs into a single PDF document.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    temp_files = []
    writer = PdfWriter()
    
    try:
        for file in files:
            if not validate_pdf(file):
                raise HTTPException(status_code=400, detail=f"Invalid PDF file: {file.filename}")
            
            # Save to temporary file to prevent memory issues with large files
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                temp_file.write(file.file.read())
                temp_file.flush()
                temp_files.append(temp_file.name)
                
                # Add pages to writer
                reader = PdfReader(temp_file.name)
                for page in reader.pages:
                    writer.add_page(page)
        
        # Write merged PDF to memory
        output = io.BytesIO()
        writer.write(output)
        output.seek(0)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_temp_files, temp_files)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"merged_{timestamp}.pdf"
        
        return StreamingResponse(
            output, 
            media_type="application/pdf", 
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    
    except Exception as e:
        logger.error(f"PDF merge error: {str(e)}")
        # Clean up on error
        for file_path in temp_files:
            if os.path.exists(file_path):
                os.unlink(file_path)
        raise HTTPException(status_code=500, detail=f"PDF merge failed: {str(e)}")

@router.post("/split", summary="Split a PDF by page range")
async def split_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to split"),
    start: int = Query(1, ge=1, description="Starting page number (1-indexed)"),
    end: Optional[int] = Query(None, description="Ending page number (inclusive, leave empty for all pages)")
):
    """
    Extract specific pages from a PDF document based on page range.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            num_pages = len(reader.pages)
            if end is None or end > num_pages:
                end = num_pages
                
            if start < 1 or start > end or start > num_pages:
                raise HTTPException(status_code=400, detail=f"Invalid page range: {start}-{end} for a PDF with {num_pages} pages")
            
            for i in range(start-1, end):
                writer.add_page(reader.pages[i])
                
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"split_{start}_to_{end}_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF split error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"PDF split failed: {str(e)}")

@router.post("/extract-text", summary="Extract text from PDF")
async def extract_text_from_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF to extract text from"),
    page_numbers: Optional[List[int]] = Query(None, description="Specific page numbers to extract (1-indexed, empty for all pages)")
):
    """
    Extract text content from a PDF document.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            # If specific pages are requested
            if page_numbers:
                result = {}
                with pdfplumber.open(temp_file_path) as pdf:
                    num_pages = len(pdf.pages)
                    for page_num in page_numbers:
                        if 1 <= page_num <= num_pages:
                            page = pdf.pages[page_num - 1]  # Convert to 0-indexed
                            result[f"page_{page_num}"] = page.extract_text() or ""
                text_content = result
            else:
                # Extract all text
                text = extract_text(temp_file_path)
                text_content = {"text": text}
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content=text_content)
    
    except Exception as e:
        logger.error(f"Text extraction error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

@router.post("/extract-images", summary="Extract images from PDF")
async def extract_images_from_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF to extract images from"),
    page_numbers: Optional[List[int]] = Query(None, description="Specific page numbers to extract from (1-indexed, empty for all pages)"),
    resolution: int = Query(150, ge=72, le=600, description="Image extraction resolution (DPI)")
):
    """
    Extract embedded images from a PDF document.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
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
                        
                        # Convert to base64 for JSON response
                        base64_image = base64.b64encode(bio.getvalue()).decode("utf-8")
                        
                        images_data.append({
                            "page": i+1,
                            "index": img_index,
                            "image_base64": base64_image,
                            "width": crop.width,
                            "height": crop.height
                        })
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content={"images": images_data})
    
    except Exception as e:
        logger.error(f"Image extraction error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Image extraction failed: {str(e)}")

@router.post("/compress", summary="Compress PDF size")
async def compress_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to compress"),
    quality: int = Query(80, ge=10, le=100, description="Image quality for compression (10-100)")
):
    """
    Reduce the file size of a PDF document.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            # Open with pikepdf for compression
            with pikepdf.Pdf.open(temp_file_path) as pdf:
                output = io.BytesIO()
                # Configure compression options
                pdf.save(
                    output,
                    compress_streams=True,
                    preserve_pdfa=False,
                    object_stream_mode=pikepdf.ObjectStreamMode.generate,
                    linearize=False,
                    qdf=False
                )
                output.seek(0)
                
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"compressed_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF compression error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"PDF compression failed: {str(e)}")

@router.post("/rotate", summary="Rotate PDF pages")
async def rotate_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to rotate"),
    degrees: int = Query(90, description="Rotation angle in degrees (90, 180, 270)"),
    pages: Optional[List[int]] = Query(None, description="Specific pages to rotate (1-indexed, empty for all pages)")
):
    """
    Rotate pages in a PDF document by a specified angle.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    # Validate rotation angle
    if degrees not in [90, 180, 270]:
        raise HTTPException(status_code=400, detail="Rotation must be 90, 180, or 270 degrees")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            num_pages = len(reader.pages)
            
            # Determine which pages to rotate
            pages_to_rotate = pages if pages else list(range(1, num_pages + 1))
            
            # Validate page numbers
            invalid_pages = [p for p in pages_to_rotate if p < 1 or p > num_pages]
            if invalid_pages:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid page numbers: {invalid_pages}. PDF has {num_pages} pages."
                )
            
            # Process each page
            for i in range(num_pages):
                page = reader.pages[i]
                if (i + 1) in pages_to_rotate:
                    page.rotate_clockwise(degrees)
                writer.add_page(page)
                
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"rotated_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF rotation error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"PDF rotation failed: {str(e)}")

@router.post("/watermark", summary="Add watermark to PDF")
async def add_watermark(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to watermark"),
    watermark_text: str = Query("CONFIDENTIAL", min_length=1, max_length=50, description="Text to use as watermark"),
    opacity: float = Query(0.3, ge=0.1, le=1.0, description="Watermark opacity (0.1-1.0)"),
    pages: Optional[List[int]] = Query(None, description="Specific pages to watermark (1-indexed, empty for all pages)")
):
    """
    Add a text watermark to pages in a PDF document.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            # Create watermark PDF
            packet = io.BytesIO()
            c = canvas.Canvas(packet, pagesize=letter)
            c.setFont("Helvetica", 60)
            c.setFillAlpha(opacity)
            c.saveState()
            c.translate(letter[0]/2, letter[1]/2)  # Center of the page
            c.rotate(45)
            c.setFillColorRGB(0.5, 0.5, 0.5)  # Gray
            c.drawCentredString(0, 0, watermark_text)
            c.restoreState()
            c.save()
            packet.seek(0)
            
            watermark = PdfReader(packet)
            wm_page = watermark.pages[0]
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            num_pages = len(reader.pages)
            
            # Determine which pages to watermark
            pages_to_watermark = pages if pages else list(range(1, num_pages + 1))
            
            # Validate page numbers
            invalid_pages = [p for p in pages_to_watermark if p < 1 or p > num_pages]
            if invalid_pages:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid page numbers: {invalid_pages}. PDF has {num_pages} pages."
                )
            
            # Process each page
            for i in range(num_pages):
                page = reader.pages[i]
                if (i + 1) in pages_to_watermark:
                    page.merge_page(wm_page)
                writer.add_page(page)
                
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"watermarked_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"Watermark error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"Adding watermark failed: {str(e)}")

@router.post("/encrypt", summary="Encrypt PDF with password")
async def encrypt_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to encrypt"),
    user_password: str = Query(..., min_length=4, description="User password for opening"),
    owner_password: Optional[str] = Query(None, min_length=4, description="Owner password for full access (defaults to user password)")
):
    """
    Encrypt a PDF document with user and owner passwords.
    """
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            # Use same password for owner if not specified
            if not owner_password:
                owner_password = user_password
                
            # Add all pages to the new PDF
            for page in reader.pages:
                writer.add_page(page)
                
            # Encrypt the PDF
            writer.encrypt(user_pwd=user_password, owner_pwd=owner_password)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"encrypted_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF encryption error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"PDF encryption failed: {str(e)}")

@router.post("/decrypt", summary="Decrypt PDF with password")
async def decrypt_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to decrypt"),
    password: str = Query(..., min_length=1, description="Password to decrypt the PDF")
):
    """
    Remove password protection from a PDF document.
    """
    temp_file_path = None
    
    try:
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            # Try to open with password
            try:
                pdf = pikepdf.Pdf.open(temp_file_path, password=password)
            except Exception:
                raise HTTPException(status_code=400, detail="Invalid password or the PDF is not encrypted")
                
            # Save without encryption
            output = io.BytesIO()
            pdf.save(output)
            output.seek(0)
            
            # Schedule cleanup
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"decrypted_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"PDF decryption error: {str(e)}")
        # Clean up on error
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        raise HTTPException(status_code=500, detail=f"PDF decryption failed: {str(e)}")

@router.post("/images-to-pdf", summary="Convert images to PDF")
async def images_to_pdf(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(..., description="Image files to convert"),
    page_size: str = Query("A4", description="Page size (A4, letter)"),
    margin: int = Query(0, ge=0, le=100, description="Margin in points")
):
    """
    Convert uploaded images to a single PDF document.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No image files provided")
    
    temp_files = []
    
    try:
        pil_images = []
        
        # Process each image
        for file in files:
            # Check if content type is an image
            if not file.content_type.startswith("image/"):
                raise HTTPException(status_code=400, detail=f"File {file.filename} is not an image")
            
            # Save to temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
                temp_file.write(file.file.read())
                temp_file.flush()
                temp_files.append(temp_file.name)
                
                try:
                    img = Image.open(temp_file.name)
                    # Convert transparency to white background
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
            
        # Determine page size
        if page_size.upper() == "A4":
            page_dims = A4
        elif page_size.lower() == "letter":
            page_dims = letter
        else:
            page_dims = A4  # Default to A4
            
        # Create PDF
        output = io.BytesIO()
        
        # Create a new empty PDF with the first image
        first_image = pil_images[0]
        
        # Calculate scaling to fit page with margins
        page_width, page_height = page_dims
        content_width = page_width - 2 * margin
        content_height = page_height - 2 * margin
        
        # Save all images to PDF
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
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_temp_files, temp_files)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"images_to_pdf_{timestamp}.pdf"
        
        return StreamingResponse(
            output, 
            media_type="application/pdf", 
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    
    except HTTPException:
        # Re-raise HTTP exceptions
        # Clean up on error
        for file_path in temp_files:
            if os.path.exists(file_path):
                os.unlink(file_path)
        raise
    except Exception as e:
        logger.error(f"Image to PDF conversion error: {str(e)}")
        # Clean up on error
        for file_path in temp_files:
            if os.path.exists(file_path):
                os.unlink(file_path)
        raise HTTPException(status_code=500, detail=f"Image to PDF conversion failed: {str(e)}")

@router.get("/health", summary="Health check endpoint")
async def health_check():
    """
    Simple health check endpoint to verify the service is running.
    """
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}