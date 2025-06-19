import io
import tempfile
from datetime import datetime
from typing import List, Optional
from fastapi import UploadFile, HTTPException, Query
from fastapi.responses import StreamingResponse
from PyPDF2 import PdfReader, PdfWriter

from .core import validate_pdf, cleanup_temp_files, logger

async def merge_pdfs(files: List[UploadFile], background_tasks) -> StreamingResponse:
    """Merge multiple PDFs into a single PDF document."""
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    temp_files = []
    writer = PdfWriter()
    
    try:
        for file in files:
            if not validate_pdf(file):
                raise HTTPException(status_code=400, detail=f"Invalid PDF file: {file.filename}")
            
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
                temp_file.write(file.file.read())
                temp_file.flush()
                temp_files.append(temp_file.name)
                
                reader = PdfReader(temp_file.name)
                for page in reader.pages:
                    writer.add_page(page)
        
        output = io.BytesIO()
        writer.write(output)
        output.seek(0)
        
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
        cleanup_temp_files(temp_files)
        raise HTTPException(status_code=500, detail=f"PDF merge failed: {str(e)}")

async def split_pdf(
    file: UploadFile,
    start: int,
    end: Optional[int],
    background_tasks
) -> StreamingResponse:
    """Extract specific pages from a PDF document based on page range."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
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
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid page range: {start}-{end} for a PDF with {num_pages} pages"
                )
            
            for i in range(start-1, end):
                writer.add_page(reader.pages[i])
                
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
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
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"PDF split failed: {str(e)}")

async def rotate_pdf(
    file: UploadFile,
    degrees: int,
    pages: Optional[List[int]],
    background_tasks
) -> StreamingResponse:
    """Rotate pages in a PDF document by a specified angle."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    if degrees not in [90, 180, 270]:
        raise HTTPException(status_code=400, detail="Rotation must be 90, 180, or 270 degrees")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            num_pages = len(reader.pages)
            pages_to_rotate = pages if pages else list(range(1, num_pages + 1))
            
            invalid_pages = [p for p in pages_to_rotate if p < 1 or p > num_pages]
            if invalid_pages:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid page numbers: {invalid_pages}. PDF has {num_pages} pages."
                )
            
            for i in range(num_pages):
                page = reader.pages[i]
                if (i + 1) in pages_to_rotate:
                    page.rotate_clockwise(degrees)
                writer.add_page(page)
                
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
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
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"PDF rotation failed: {str(e)}") 