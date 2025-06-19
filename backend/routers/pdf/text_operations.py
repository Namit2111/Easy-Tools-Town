import tempfile
from typing import List, Optional, Dict
from fastapi import UploadFile, HTTPException
from fastapi.responses import JSONResponse
import pdfplumber
from pdfminer.high_level import extract_text

from .core import validate_pdf, cleanup_temp_files, logger

async def extract_text_from_pdf(
    file: UploadFile,
    page_numbers: Optional[List[int]],
    background_tasks
) -> JSONResponse:
    """Extract text content from a PDF document."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            if page_numbers:
                result = {}
                with pdfplumber.open(temp_file_path) as pdf:
                    num_pages = len(pdf.pages)
                    for page_num in page_numbers:
                        if 1 <= page_num <= num_pages:
                            page = pdf.pages[page_num - 1]
                            result[f"page_{page_num}"] = page.extract_text() or ""
                text_content = result
            else:
                text = extract_text(temp_file_path)
                text_content = {"text": text}
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content=text_content)
    
    except Exception as e:
        logger.error(f"Text extraction error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}") 